import re

file_path = '/Users/vivekmaini/Nextprep/server/ai/llm/localLLMService.js'
with open(file_path, 'r') as f:
    content = f.read()

# Replace gemini-1.5-flash with gemini-flash-latest
old_url = 'gemini-1.5-flash:generateContent'
new_url = 'gemini-flash-latest:generateContent'

if old_url in content:
    content = content.replace(old_url, new_url)
    with open(file_path, 'w') as f:
        f.write(content)
    print("URL updated successfully to use the latest model!")
