interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  listItems: TypeItemProduct[] | Recipe;
  setListOfFoundItems: (listOfFoundItems: TypeItemProduct[] | Recipe) => void;
  placeholder?: string;
}
