/* Terminal input sim */
document.addEventListener("DOMContentLoaded", function () {
    const terminalTitle = document.getElementById('terminal-title');
    const terminalContent = document.getElementById('terminal-content');
    const skillHexes = document.querySelectorAll('.cv-hex[data-info]');

    if (terminalTitle && terminalContent && skillHexes.length > 0) {
        skillHexes.forEach(hex => {
            hex.addEventListener('mouseenter', () => {
                const info = hex.getAttribute('data-info') || '';
                const [title, ...rest] = info.split(':');
                terminalTitle.textContent = title ? title.trim() : '';
                terminalContent.textContent = rest.length > 0 ? rest.join(':').trim() : '';
            });
            hex.addEventListener('mouseleave', () => {
                terminalTitle.textContent = 'Hover a skill to see info here';
                terminalContent.textContent = 'This are some of the tools I know, but I\'m always eager to learn something new...';
            });
        });
    }

    const terminalInput = document.querySelector('#terminal .terminal-input');
    if (terminalInput && terminalTitle && terminalContent) {
        terminalInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                if (command.length === 0) return;
                terminalTitle.textContent = command;
                terminalContent.textContent = simulateTerminalCommand(command);
                terminalInput.value = '';
            }
        });
    }

    const files = [
        { name: 'joke.txt', content: "Why do programmers prefer dark mode? Because light attracts bugs!" },
        { name: 'coffee.txt', content: "Warning: System running low on coffee. Please refill to avoid errors." },
        { name: 'readme.md', content: "This is not the file you are looking for." },
        { name: 'todo.txt', content: "1. Write code\n2. Debug code\n3. Repeat" },
        { name: 'cat.gif', content: "Sorry, this terminal does not support GIFs. Imagine a cute cat here." }
    ];

    function simulateTerminalCommand(cmd) {
        switch (cmd.split(" ")[0].toLowerCase()) {
            case 'help':
                return "Available commands: help, whoami, clear, date, echo, cat, ls, read, pokedex";
            case 'whoami':
                return "Rubén López Singla - Software Engineer. Find me on GitHub: slopezruben";
            case 'clear':
                terminalTitle.textContent = 'Hover a skill to see info here';
                terminalContent.textContent = 'This are some of the tools I know, but I\'m always eager to learn something new...';
                return '';
            case 'date':
                return new Date().toString();
            case 'echo':
                return cmd.split(" ").slice(1).join(" ");
            case 'ls':
                return files.map(file => file.name).join("\n");
            case 'read':
            case 'cat':
                if(cmd.split(" ").length < 2) return "Usage: cat <file_name>. See files with 'ls'.";
                return cmd.split(" ").slice(1).map(fileName => {
                    const file = files.find(f => f.name === fileName);
                    if (file) {
                        return `${file.content}`;
                    } else {
                        return `cat: ${fileName}: No such file or directory`;
                    }
                }).join("\n");
            case 'pokedex':
                // Get the pokemon name from the command
                const pokemonName = cmd.split(" ")[1];
                if (!pokemonName) return "Usage: pokedex <name>. Try pokedex Pikachu.";
                // Show loading message
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${encodeURIComponent(pokemonName.toLowerCase())}`)
                    .then(res => {
                        if (!res.ok) throw new Error("Pokémon not found");
                        return res.json();
                    })
                    .then(data => {
                        const entry = data.flavor_text_entries.find(e => e.language.name === "en");
                        if (entry) {
                            terminalContent.textContent = entry.flavor_text.replace(/\f/g, ' ');
                        } else {
                            terminalContent.textContent = "No English flavor text found for this Pokémon.";
                        }
                    })
                    .catch(() => {
                        terminalContent.textContent = "Pokémon not found or error fetching data.";
                    });
                return `Fetching data for ${pokemonName} from PokeAPI...`;
            default:
                return `Command not found: ${cmd}. Type 'help' for a list of commands.`;
        }
    }
});
