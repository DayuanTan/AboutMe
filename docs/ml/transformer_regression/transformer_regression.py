# people_income_transformer.py
# predict income from sex, age, city, politics
# PyTorch 2.0.0-CPU Anaconda3-2022.10  Python 3.9.13
# Windows 10/11 

# Transformer component for regression

import numpy as np
import torch as T

device = T.device('cpu')  # apply to Tensor or Module

# -----------------------------------------------------------

class PeopleDataset(T.utils.data.Dataset):
  def __init__(self, src_file):
    # sex age   state   income   politics
    # -1  0.27  0 1 0   0.7610   0 0 1
    # +1  0.19  0 0 1   0.6550   1 0 0

    # tmp_x = np.loadtxt(src_file, usecols=[0,1,2,3,4,6,7,8],
    #   delimiter="\t", comments="#", dtype=np.float32)
    tmp_x = np.loadtxt(src_file, usecols=[0,1,2,3,4,6,7,8], dtype=np.float32)
    print("tmp x: ", tmp_x)
    
    # tmp_y = np.loadtxt(src_file, usecols=5,
    #   delimiter="\t", comments="#", dtype=np.float32)
    tmp_y = np.loadtxt(src_file, usecols=5, dtype=np.float32)
    tmp_y = tmp_y.reshape(-1,1)  # 2D required
    print("tmp y: ", tmp_y)
    

    self.x_data = T.tensor(tmp_x, dtype=T.float32).to(device)
    self.y_data = T.tensor(tmp_y, dtype=T.float32).to(device)

  def __len__(self):
    return len(self.x_data)

  def __getitem__(self, idx):
    preds = self.x_data[idx]
    incom = self.y_data[idx] 
    return (preds, incom)  # as a tuple

# -----------------------------------------------------------

class SkipLinear(T.nn.Module):

  # -----

  class Core(T.nn.Module):
    def __init__(self, n):
      super().__init__()
      # 1 node to n nodes, n gte 2
      self.weights = T.nn.Parameter(T.zeros((n,1),
        dtype=T.float32))
      self.biases = T.nn.Parameter(T.tensor(n,
        dtype=T.float32))
      lim = 0.01
      T.nn.init.uniform_(self.weights, -lim, lim)
      T.nn.init.zeros_(self.biases)

    def forward(self, x):
      wx= T.mm(x, self.weights.t())
      v = T.add(wx, self.biases)
      return v

  # -----

  def __init__(self, n_in, n_out):
    super().__init__()
    self.n_in = n_in; self.n_out = n_out
    if n_out  % n_in != 0:
      print("FATAL: n_out must be divisible by n_in")
    n = n_out // n_in  # num nodes per input

    self.lst_modules = \
      T.nn.ModuleList([SkipLinear.Core(n) for \
        i in range(n_in)])

  def forward(self, x):
    lst_nodes = []
    for i in range(self.n_in):
      xi = x[:,i].reshape(-1,1)
      oupt = self.lst_modules[i](xi)
      lst_nodes.append(oupt)
    result = T.cat((lst_nodes[0], lst_nodes[1]), 1)
    for i in range(2,self.n_in):
      result = T.cat((result, lst_nodes[i]), 1)
    result = result.reshape(-1, self.n_out)
    return result

# -----------------------------------------------------------

class PositionalEncoding(T.nn.Module):  # documentation code
  def __init__(self, d_model: int, dropout: float=0.1,
   max_len: int=5000):
    super(PositionalEncoding, self).__init__()  # old syntax
    self.dropout = T.nn.Dropout(p=dropout)
    pe = T.zeros(max_len, d_model)  # like 10x4
    position = \
      T.arange(0, max_len, dtype=T.float).unsqueeze(1)
    div_term = T.exp(T.arange(0, d_model, 2).float() * \
      (-np.log(10_000.0) / d_model))
    pe[:, 0::2] = T.sin(position * div_term)
    pe[:, 1::2] = T.cos(position * div_term)
    pe = pe.unsqueeze(0).transpose(0, 1)
    self.register_buffer('pe', pe)  # allows state-save

  def forward(self, x):
    x = x + self.pe[:x.size(0), :]
    return self.dropout(x)

# -----------------------------------------------------------

class TransformerNet(T.nn.Module):
  def __init__(self):
    super(TransformerNet, self).__init__()
    self.embed = SkipLinear(8, 32)  # 8 inputs, each goes to 4 
    self.pos_enc = \
      PositionalEncoding(4, dropout=0.20)  # positional
    self.enc_layer = T.nn.TransformerEncoderLayer(d_model=4,
      nhead=2, dim_feedforward=10, 
      batch_first=True)  # d_model divisible by nhead
    self.trans_enc = T.nn.TransformerEncoder(self.enc_layer,
      num_layers=2)  # 6 layers default

    self.fc1 = T.nn.Linear(32, 10)  # 8--32-T-10-1
    self.fc2 = T.nn.Linear(10, 1)

    # default weight and bias initialization

  def forward(self, x):
    z = self.embed(x)  # 8 inpts to 32 embed
    z = z.reshape(-1, 8, 4)  # bat seq embed
    z = self.pos_enc(z) 
    z = self.trans_enc(z) 
    z = z.reshape(-1, 32)  # torch.Size([bs, xxx])
    z = T.tanh(self.fc1(z))
    z = self.fc2(z)  # regression: no activation
    return z

# -----------------------------------------------------------

def accuracy(model, ds, pct_close):
  # assumes model.eval()
  # correct within pct of true income
  n_correct = 0; n_wrong = 0

  for i in range(len(ds)):
    X = ds[i][0].reshape(1,-1)  # make it a batch
    Y = ds[i][1].reshape(1)
    with T.no_grad():
      oupt = model(X)         # computed income

    if T.abs(oupt - Y) < T.abs(pct_close * Y):
      n_correct += 1
    else:
      n_wrong += 1
  acc = (n_correct * 1.0) / (n_correct + n_wrong)
  return acc

# -----------------------------------------------------------

def accuracy_x(model, ds, pct_close):
  # all-at-once (quick)
  # assumes model.eval()
  X = ds.x_data  # all inputs
  Y = ds.y_data  # all targets
  n_items = len(X)
  with T.no_grad():
    pred = model(X)  # all predicted incomes
 
  n_correct = T.sum((T.abs(pred - Y) < \
    T.abs(pct_close * Y)))
  result = (n_correct.item() / n_items)  # scalar
  return result  

# -----------------------------------------------------------

def train(model, ds, bs, lr, me, le, test_ds):
  # dataset, bat_size, lrn_rate, max_epochs, log interval
  train_ldr = T.utils.data.DataLoader(ds, batch_size=bs,
    shuffle=True)
  loss_func = T.nn.MSELoss()
  optimizer = T.optim.Adam(model.parameters(), lr=lr)

  for epoch in range(0, me):
    epoch_loss = 0.0  # for one full epoch
    for (b_idx, batch) in enumerate(train_ldr):
      X = batch[0]  # predictors
      y = batch[1]  # target income
      optimizer.zero_grad()
      oupt = model(X)
      loss_val = loss_func(oupt, y)  # a tensor
      epoch_loss += loss_val.item()  # accumulate
      loss_val.backward()  # compute gradients
      optimizer.step()     # update weights

    if epoch % le == 0:
      print("epoch = %4d  |  loss = %0.4f" % \
        (epoch, epoch_loss))
      # model.eval()
      # print("-------------")
      # acc_train = accuracy(model, ds, 0.10)
      # print("Accuracy on train data = %0.4f" % acc_train)
      # acc_test = accuracy(model, test_ds, 0.10) 
      # print("Accuracy on test data = %0.4f" % acc_test)
      # model.train()
      # print("-------------")

# -----------------------------------------------------------

def main():
  # 0. get started
  print("\nBegin People predict income using Transformer ")
  T.manual_seed(0)
  np.random.seed(0)
  
  # 1. create Dataset objects
  print("\nCreating People Dataset objects ")
  train_file = "data_train.txt"
  train_ds = PeopleDataset(train_file)  # 200 rows

  test_file = "data_test.txt"
  test_ds = PeopleDataset(test_file)  # 40 rows

  # 2. create network
  print("\nCreating (8--32)-T-10-1 neural network ")
  net = TransformerNet().to(device)

# -----------------------------------------------------------

  # 3. train model
  print("\nbat_size = 10 ")
  print("loss = MSELoss() ")
  print("optimizer = Adam ")
  print("lrn_rate = 0.01 ")

  print("\nStarting training")
  net.train()
  train(net, train_ds, bs=10, lr=0.01, me=300,
    le=50, test_ds=test_ds)
  print("Done ")

# -----------------------------------------------------------

  # 4. evaluate model accuracy
  print("\nComputing model accuracy (within 0.10 of true) ")
  net.eval()
  acc_train = accuracy(net, train_ds, 0.10)  # item-by-item
  print("Accuracy on train data = %0.4f" % acc_train)

  acc_test = accuracy_x(net, test_ds, 0.10)  # all-at-once
  print("Accuracy on test data = %0.4f" % acc_test)

# -----------------------------------------------------------

  # 5. make a prediction
  print("\nPredicting income for M 34 Oklahoma moderate: ")
  x = np.array([[-1, 0.34, 0,0,1,  0,1,0]],
    dtype=np.float32)
  x = T.tensor(x, dtype=T.float32).to(device) 

  with T.no_grad():
    pred_inc = net(x)
  pred_inc = pred_inc.item()  # scalar
  print("$%0.2f" % (pred_inc * 100_000))  # un-normalized

# -----------------------------------------------------------

  # 6. save model (state_dict approach)
  print("\nSaving trained model state")
  fn = "models__people_income_model.pt"
  T.save(net.state_dict(), fn)

  # model = Net()
  # model.load_state_dict(T.load(fn))
  # use model to make prediction(s)

  print("\nEnd People income demo ")

if __name__ == "__main__":
  main()