

## Decision tree 
- that includes the kinds of questions you should ask when trying to determine whether you should be using a blockchain at all.
  - you're an executive and you're trying to determine if a blockchain is the right solution for a project that you have. 
  


1. Databse needed?
   - The first question to ask about your project is, do you need a database? 
     - If you don't need a database at all, you don't need a blockchain.
   - BitTorrent, peer-to-peer sharing file system, no need database
2. Share write access?
   - The role of blockchain is to spread the authority to write amongst a group without any one group controlling access. 
     - If you don't need to share this access with multiple people or groups, you don't need a blockchain.
   - For example you want to collect traffic information and sell it you don't need blockchain (no need multiple groups to write into database)
3. Are any of the parties unknown or untrusted? Or if they're trusted, is it possible for them to have conflicting interests?
   - On the Bitcoin blockchain, people have conflicting interests because they stand to gain from an invalid transaction that works in their favor. 因为他们可以从对他们有利的无效交易中获利。
   - if you know and trust all the parties and you know that everyone's interests are unified, then you don't need a blockchain. 
   - For example, suppose three water companies want to maintain a shared database of pollution levels across various sources. They all trust each other and all their interests are unified, they probably don't need a blockchain.
4. Can rely on a trusted 3rd party?
   - But if all parties aren't known or trusted, or they are but have potentially conflicting interests, consider if you could rely on a third party to control the database, or audit it. If that's possible, you don't need a blockchain. 
   - For example, three competing furniture resellers agree to a shared database of suppliers. However, they are all able to trust a third party to manage the database. This third party is an intermediary but they all trust it, so they don't need a blockchain. 

 But if you can't trust an intermediary, after all of that, you're finally ready to start talking blockchains. 

To recap, we have a business problem or project that needs a **database**, requires **shared** **access** amongst parties that may **not be known or trusted** or may have competing interests, and it's not practical or possible for a **third party** to be trusted to manage the database.

5. Access control and multiple-party consensus?
   - Do you want to control access and functionality and will just one party verify information without consensus internally in a high trust environment?
   - If you want to control access and functionality 
     - If only one part, no need consensus: 
       - and will just one party verify information without consensus internally in a high trust environment?
       - If so, a private permission blockchain will work. That's a blockchain operated by you and your organization. This is really just a distributed ledger and it's not very blockchainy. 
     - Else need consensus among multi parties:
       - If you want to control functionality but consensus must be reached by multiple parties, that is other entities will be verifying, writing, and auditing data on the blockchain along with you, 
       - then a shared or consortium, or shared permission blockchain is what you want to use.
       - In this case, a group of possibly competing entities share access and use of a blockchain database.
6. Don't want transactions to be publicly viewable?
   - non-private blockchain: private or consortium
7. Public blockchain: 
   - you don't control functionality, 
   - it immutable
     - the cost is speed and efficiency
   - and all transactions are public
     - Anyone can join it and use it.
   - Use existing public blockchain
     - it's ready-made. 
       - if you wanted to build an app that needs a blockchain, public blockchains are waiting for you.
       
   - Use your own public blockchain
     - You could also create your own public blockchain to fulfill a specific need
     - But being public, you're dealing with unknown and untrusted entities writing to the block chain, so great care must be taken to ensure a robust set of consensus mechanisms are in place to keep the blockchain secure
   
## Supplemental Reading: When to Use a Blockchain

While there is a lot of excitement surrounding blockchain, it's important to stay realistic about the technology's potential. After understanding the requirement, it is important to consider if blockchain is really needed to solve this problem.

[This article lists the factors that need to be considered before arriving at the decision to use a blockchain.](3.2Avoiding%20the%20pointless%20blockchain%20project%20%7C%20MultiChain.pdf) or [pdf](3.2multichain.com-Avoiding%20the%20pointless%20blockchain%20project.pdf)  
 