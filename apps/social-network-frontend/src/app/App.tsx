import { useGetGreetingTextQuery } from './services/greeting/greeting';

const App = () => {
  const { data, error, isLoading } = useGetGreetingTextQuery();

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <div>
      {isLoading ?
        <h1>Loading...</h1> :
        data && <h1>{data.content}</h1>
      }
    </div>
  );
}

export default App;
