export const commands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args : any) => args.join(' ')
    },
    whoami: {
        description: 'Know about the developer',
        fn : () => {
            return `
                Hi there! I'm Chinmay Pant, a software engineer passionate about building awesome frontend web applications.
                Currently, I am learning about micro-frontends and building lightweight frontends.
                Feel free to reach out to me at chinmaypant21@gmail.com.
                Other Socials:
                Linedin: https://www.linkedin.com/in/chinmaypant
                Stackoverflow: https://stackoverflow.com/users/15276488/chinz
                Github: https://github.com/chinmaypant21
            `;      
        }
    }
}