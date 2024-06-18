import { faker } from "@faker-js/faker";
import { memo, useMemo, useState } from "react";

interface DataProps {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

interface ListProps {
  id: number;
  fullName: string;
  age: number;
}

// Function to generate fake data
const generateFakeData = (num: number) => {
  const fakeData = [];
  for (let i = 0; i < num; i++) {
    fakeData.push({
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 20, max: 60 }),
    });
  }
  return fakeData;
};

// Example of a heavy process function
const heavyProcess = (list: DataProps[]) => {
  console.log("Running heavy process...");
  // Simulate a heavy computation
  return list.map((item) => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`,
    age: item.age * 2, // Example transformation
  }));
};

const List = () => {
  console.log("List component rendered");
  const [list, setList] = useState(generateFakeData(1000)); // Generating 1000 fake data items

  // Memoize the result of the heavy process
  const processedList = useMemo(() => {
    return heavyProcess(list);
  }, [list]);

  return (
    <div className="protected-list">
      <h1>Processed List</h1>
      <ul>
        {processedList.map((item: ListProps, idx: number) => (
          <li key={item.id + "" + idx}>
            {item.fullName} - Age: {item.age}
          </li>
        ))}
      </ul>
      <button onClick={() => setList([...list, ...generateFakeData(10)])}>
        Add More Fake Data
      </button>
    </div>
  );
};

export default memo(List);
