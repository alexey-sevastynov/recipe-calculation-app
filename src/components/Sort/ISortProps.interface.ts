interface ISortProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  listFoundItems: TypeItemProduct[];
  setListOfFoundProducts: (listOfFoundItems: TypeItemProduct[]) => void;
}
