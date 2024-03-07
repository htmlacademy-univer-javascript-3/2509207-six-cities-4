import Hub from '../../pages/mainpage/mainpage';
import { ListCards } from '../../pages/mainpage/cards';


function App({ places }: ListCards): JSX.Element {
  return (
    <Hub places={places} />
  );
}

export default App;
