// configuração de ambiente para resolver o problema do axios e act

module.exports = {
    transform:{"^.\\.[jt]sx?$":"babel-jest"}, // "transform" diz ao jest como processar os aarquivos js modernos com o babel
    transformIgnorePatterns:["/node_modules/(?!axios)"],

    moduleNameMapper:{"\\.(css|less|scss|sass)$ ": "identity-obj-proxy"}, // define aliases para caminhos customizados nos imports

    testEnvironment:"jsdom",
    setupFilesAfterEnv:["<rootDir>/src/setupTest.js"]

}