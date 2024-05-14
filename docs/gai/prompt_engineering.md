# Prompting Principles

- [Prompting Principles](#prompting-principles)
- [Andrew Ng \& Isa Fulford - ChatGPT Prompt Engineering for Developers](#andrew-ng--isa-fulford---chatgpt-prompt-engineering-for-developers)
  - [Principle 1: Write clear and specific instructions](#principle-1-write-clear-and-specific-instructions)
  - [Principle 2: Give the model time to “think”](#principle-2-give-the-model-time-to-think)
    - [Notes](#notes)
  - [Iterative prompt development](#iterative-prompt-development)
    - [Notes](#notes-1)
  - [Capabilites](#capabilites)
  - [Chatbot](#chatbot)
    - [Notes](#notes-2)
- [Andrew Ng \& Amit Sangani - Prompt Engineering with Llama 2\&3](#andrew-ng--amit-sangani---prompt-engineering-with-llama-23)
  - [Overview Llama Models](#overview-llama-models)
  - [Basic](#basic)
  - [Multi-turn Conversations](#multi-turn-conversations)
  - [Prompt Engineering Techniques](#prompt-engineering-techniques)
  - [Llama guard](#llama-guard)


# Andrew Ng & Isa Fulford - ChatGPT Prompt Engineering for Developers  
https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction 

## Principle 1: Write clear and specific instructions

- Tactic 1: Use delimiters to clearly indicate distinct parts of the input
- - Delimiters can be anything like: ```, """, < >, <tag> </tag>, :
- Tactic 2: Ask for a structured output
- - JSON, HTML
- Tactic 3: Ask the model to check whether conditions are satisfied
- Tactic 4: "Few-shot" prompting


## Principle 2: Give the model time to “think”
- Tactic 1: Specify the steps required to complete a task
- Ask for output in a specified format
- Tactic 2: Instruct the model to work out its own solution before rushing to a conclusion

### Notes
- [2-guidelines.html](./andrew_ng_prompts/l2-guidelines.html)
- [2-guidelines.ipynb](./andrew_ng_prompts/l2-guidelines.ipynb)

## Iterative prompt development
 
### Notes
- [](./) 

## Capabilites
- Summarizing
- - Summarize with a word/sentence/character limit
- - Summarize with a focus on xxx
- - Try "extract" instead of "summarize"

- - Notes [4-summarizing.html](./andrew_ng_prompts/l4-summarizing.html)
- - Notes [4-summarizing.ipynb](./andrew_ng_prompts/l4-summarizing.ipynb)

- Inferring
- - Notes [5-inferring.html](./andrew_ng_prompts/l5-inferring.html)
- - Notes [5-inferring.ipynb](./andrew_ng_prompts/l5-inferring.ipynb)
- Transforming
- - Notes [6-transforming.html](./andrew_ng_prompts/l6-transforming.html)
- - Notes [6-transforming.ipynb](./andrew_ng_prompts/l6-transforming.ipynb)
- Expanding
- - Notes [7-expanding.html](./andrew_ng_prompts/l7-expanding.html)
- - Notes [7-expanding.ipynb](./andrew_ng_prompts/l7-expanding.ipynb)

## Chatbot
### Notes
- [](./) 



# Andrew Ng & Amit Sangani - Prompt Engineering with Llama 2&3 

## Overview Llama Models

![](./llama_prompts/llama2models.png)
![](./llama_prompts/codellamamodels.png)

## Basic
 
## Multi-turn Conversations

![](./llama_prompts/L3-1.png)
![](./llama_prompts/L3-2.png)
```
from utils import llama
from utils import llama_chat
```

## Prompt Engineering Techniques
- In-Context Learning
- Zero-shot Prompting
- Few-shot Prompting
- Specifying the Output Format
- Role Prompting
- Chain-of-thought Prompting
- - "Think step by step.
Explain each intermediate step.
Only when you are done with all your steps,
provide the answer based on your intermediate steps."

## Llama guard

![](./llama_prompts/L7_guard.png)
![](./llama_prompts/L7_guard2.png)
![](./llama_prompts/L7_guard3.png)
![](./llama_prompts/L7_guard4.png)