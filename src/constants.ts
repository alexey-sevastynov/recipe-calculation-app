export const ROUTES = {
  HOME: "/",
  ADD_PRODUCTS: "/add-products",
  CREATE_RECIPE: "/create-recipe",
};

export const COLORS = {
  red: "#760101",
  yellow: "#ffd886",
  black: "#000000",
  edit: "rgba(255, 255, 0, 0.552)",
};

export const MESSAGE_PRODUCT_LIST_EMPTY =
  "Поки що у вас немає продуктів! Додати продукти, натисніть на кнопку вище";
export const MESSAGE_RECIPE_LIST_EMPTY =
  "Поки що у вас немає рецептів! Додайте продукти та створи свій власний рецепт по тим продуктам, які додав. Для розрахунку коштів за рецепт.";
export const MESSAGE_FOUND_PRODUCT_LIST_EMPTY =
  "На жаль ми не знайшли в списку назву продукту, починаючи з цих літер, спробуй інакше";
export const MESSAGE_FOUND_RECIPE_LIST_EMPTY =
  "На жаль ми не знайшли в списку назву рецепту, починаючи з цих літер, спробуй інакше";

export const UNITS: UnitsType[] = ["гр", "мл", "кг", "л", "шт"];

export const SORT_NAMES = [
  {
    id: 1,
    value: "nameAsc",
    name: "абетка (А-Я)",
  },
  {
    id: 2,
    value: "nameDesc",
    name: "абетка (Я-А)",
  },
  {
    id: 3,
    value: "priceAsc",
    name: "ціною (від менш.)",
  },
  {
    id: 4,
    value: "priceDesc",
    name: "ціною (від більш.)",
  },
];

export const FAKE_LIST: TypeItemProduct[] = [
  {
    id: 27.57553560032877,
    productName: "дробленная фисташка",
    netWeight: 50,
    weightUnit: "гр",
    price: 120,
  },
  {
    id: 25.62151062309166,
    productName: "малиновое пюре",
    price: 235,
    netWeight: 1000,
    weightUnit: "гр",
  },
  {
    id: 90.26900081839217,
    productName: "фисташковая паста",
    netWeight: 500,
    weightUnit: "гр",
    price: 800,
  },
  {
    id: 81.81147326838918,
    productName: "шоколад белый",
    netWeight: 80,
    weightUnit: "гр",
    price: 32,
  },
  {
    id: 84.41940808353552,
    productName: "кондитерский мешок",
    netWeight: 100,
    weightUnit: "шт",
    price: 145,
  },
];

export const FAKE_LIST_RECIPE: Recipe = {
  "Молочный шоколад-вишня": {
    "Этап 1:": [
      {
        id: 39.9920692663273,
        productName: "кондитерский мешок",
        netWeight: 2,
        weightUnit: "шт",
      },
      {
        id: 58.055084222026984,
        productName: "яйцо",
        netWeight: 4,
        weightUnit: "шт",
      },
      {
        id: 9.769152152289195,
        productName: "миндальная мука",
        netWeight: 150,
        weightUnit: "гр",
      },
      {
        id: 98.872257561126,
        productName: "сахар",
        netWeight: 195,
        weightUnit: "гр",
      },
    ],
    "Этап 2:": [
      {
        id: 1.992949896500007,
        productName: "сахарная пудра",
        netWeight: 150,
        weightUnit: "гр",
      },
      {
        id: 88.88872480486036,
        productName: "пектин",
        netWeight: 6,
        weightUnit: "гр",
      },
      {
        id: 15.514402104565983,
        productName: "вишня",
        netWeight: 150,
        weightUnit: "гр",
      },
      {
        id: 41.45527305742191,
        productName: "шоколад ириска",
        netWeight: 50,
        weightUnit: "гр",
      },
      {
        id: 17.896030969838407,
        productName: "шоколад молочный",
        netWeight: 100,
        weightUnit: "гр",
      },
      {
        id: 11.651980208115376,
        productName: "сливки",
        netWeight: 120,
        weightUnit: "мл",
      },
      {
        id: 82.30581091209687,
        productName: "масло сливачное 82%",
        netWeight: 30,
        weightUnit: "гр",
      },
    ],
  },
  "Фисташка малина": [
    {
      id: 78.24660286798668,
      productName: "кондитерский мешок",
      netWeight: 2,
      weightUnit: "шт",
    },
    {
      id: 53.71530563583631,
      productName: "яйцо",
      netWeight: 4,
      weightUnit: "шт",
    },
    {
      id: 53.31106831585315,
      productName: "миндальная мука",
      netWeight: 150,
      weightUnit: "гр",
    },
    {
      id: 42.571880297456154,
      productName: "сахар",
      netWeight: 170,
      weightUnit: "гр",
    },
    {
      id: 43.03310503515498,
      productName: "сахарная пудра",
      netWeight: 150,
      weightUnit: "гр",
    },
    {
      id: 16.73785599001296,
      productName: "дробленная фисташка",
      netWeight: 15,
      weightUnit: "гр",
    },
    {
      id: 22.327018386891773,
      productName: "пектин",
      netWeight: 6,
      weightUnit: "гр",
    },
    {
      id: 20.154041655332655,
      productName: "малиновое пюре",
      netWeight: 100,
      weightUnit: "гр",
    },
    {
      id: 2.44411312031354,
      productName: "фисташковая паста",
      netWeight: 40,
      weightUnit: "гр",
    },
    {
      id: 72.33299781677994,
      productName: "шоколад белый",
      netWeight: 150,
      weightUnit: "гр",
    },
    {
      id: 68.34263196561727,
      productName: "сливки",
      netWeight: 175,
      weightUnit: "мл",
    },
    {
      id: 70.26379859172643,
      productName: "масло сливачное 82%",
      netWeight: 35,
      weightUnit: "гр",
    },
  ],
};
