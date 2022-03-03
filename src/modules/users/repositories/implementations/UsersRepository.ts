import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const assignUser = Object.assign(user, { name, email });
    this.users.push(assignUser);
    return assignUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const newUser = { ...receivedUser, admin: true, updated_at: new Date() };
    this.users = this.users.map((user) => {
      if (user.id === newUser.id) {
        return newUser;
      }
      return user;
    });
    return newUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
