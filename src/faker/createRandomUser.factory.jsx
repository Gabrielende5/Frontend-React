import { faker } from "@faker-js/faker"



export default function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate:faker.date.birthdate(),
    registeredAt:faker.date.past()
  }
}
export const users = faker.helpers.multiple(createRandomUser,{count:5}) //Criando 5 usuários aleatórios