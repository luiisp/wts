# WTS - Web Terms Seeker

Tag this project with a star 🌟
![gifwts (2)](https://github.com/luiisp/wts/assets/115284250/46d9be9a-dfa8-49f0-8bbc-e57b8a978897)

WTS is a Google Chrome extension that facilitates searching for terms/keywords on web pages. Simply enter the term to be searched, and WTS will search for matches on the current web page.

### How did the idea for WTS come about?
The idea arose from a personal experience. When reading extensive API documentation, I constantly needed to refer back to sections of the documentation to recall what I had read previously. However, due to the length of the document, this manual task became very tiresome. That's when the idea of ​​creating an extension that would facilitate searching for terms/keywords on the web page emerged.

### How does WTS work?
WTS captures the term to be searched and searches for all occurrences of the term on the current web page, highlighting the found occurrences and providing the option to navigate between them.

## Features
- [✅] Search for terms/keywords on the web page
- [✅] Navigation between found occurrences
- [✅] Highlighting of found occurrences
- [✅] Support for 21 languages (check the supported languages)

### Supported Languages
- `ar` Arabic
- `cs` Czech
- `da` Danish
- `de` German
- `en` English
- `es` Spanish
- `fi` Finnish
- `fil` Filipino
- `fr` French
- `id` Indonesian
- `ja` Japanese
- `ko` Korean
- `nl` Dutch
- `pl` Polish
- `pt_BR` Portuguese (Brazil)
- `pt_PT` Portuguese (Portugal)
- `ro` Romanian
- `ru` Russian
- `sv` Swedish
- `th` Thai
- `tr` Turkish
- `zh_CN` Chinese (China)
> Did you miss your language or notice an error in the translation? You can change this yourself! Read below how to do it
### How to add your own language

* Create a folder with your language prefix (ISO 639-1 Code) in _locates EX: _locates/pt_BR for Portuguese (Brazil) [The location prefixes in ISO 639-1 Code can be seen here](https://www.loc.gov/standards/iso639-2/php/code_list.php)

* Copy the messages.json file from a directory of any language to the folder you created

* Translate the file to your language

* Make the pull request (more information in Contributions)

## Installation
1. Clone the repository (`git clone https://github.com/luiisp/wts`)
2. Open Google Chrome and access `chrome://extensions/`
3. Enable developer mode
4. Click on `Load unpacked`
5. Select the cloned repository folder
6. Go to a web page and use the extension

## Contributions
Contributions are welcome! To contribute, follow the steps below:
1. Fork the project
2. Create a new branch (`git checkout -b feature/newFeature`)
3. Commit your changes (`git commit -m 'Add newFeature'`)
4. Push to the branch (`git push origin feature/newFeature`)
5. Open a Pull Request
6. Await PR review 🚀

## License
Distributed under the MIT license. See `LICENSE` for more information.
![wts-banner](https://github.com/luiisp/wts/assets/115284250/700f950f-3375-4197-957e-d55d72d7620f)
©2024 WTS
