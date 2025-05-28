interface User {
  name: string;
  id: number;
}

const fetchUser = async (): Promise<User> => {
  const response = await fetch('http://example.com');

  const data = await response.json();

  if (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'id' in data
  ) {
    return data as User;
  }

  throw new Error('error');
};

function add(a, b) {
  return a + b;
}

export { add };

export default async function main(): Promise<void> {
  const user: User = await fetchUser();

  console.log(user.id);
}
