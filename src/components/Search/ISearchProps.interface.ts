interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  listItems: TypeItemProduct[];
  setListOfFoundItems: (listOfFoundItems: TypeItemProduct[]) => void;
  placeholder?: string;
}
