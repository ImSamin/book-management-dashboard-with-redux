import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addProduct } from "../../redux/feature/products/productSlice";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/feature/products/productsApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ModalForm } from "./Modal";

interface Product {
  productName: string;
  author: string;
  productPrice: number;
  productQuantity: number;
  ISBN: string;
  genre: string;
  id: string;
}

const TABLE_HEAD: string[] = [
  "Marked",
  "Product Name",
  "Author",
  "Price",
  "Quantity",
  "Genre",
  "",
  "",
];

export const ProductsTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const [deletePost] = useDeleteProductMutation();
  const { data, isLoading } = useGetProductsQuery({
    searchTerm: search || undefined,
    genre: genre || undefined,
    format: format || undefined,
    language: language || undefined,
  });

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  if (isLoading) {
    return (
      <div className="mx auto shadow-lg p-2 bg-white rounded-lg h-svh flex w-full justify-center items-center ">
        <Spinner className="h-16 w-16 text-blue-700/50" />
      </div>
    );
  }

  dispatch(addProduct(data?.data?.data));

  return (
    <Card placeholder={""} className="h-full w-full">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-none "
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography placeholder={""} variant="h5" color="blue-gray">
              All Product List
            </Typography>
            <Typography
              placeholder={""}
              color="gray"
              className="mt-1 font-normal"
            >
              See information about all Products
            </Typography>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 px-4 ">
          <div className="w-full mt-4">
            <Input
              crossOrigin={""}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Genre Select */}
          <div className="relative inline-block w-52">
            <Typography
              placeholder={""}
              variant="small"
              color="blue-gray"
              className="-mb-o"
            >
              Genre
            </Typography>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All</option>
              <option value="fiction">Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="islamic">Islamic</option>
              <option value="self-development">Self-Development</option>
            </select>
          </div>

          {/* Format Select */}
          <div className="relative inline-block w-52">
            <Typography
              placeholder={""}
              variant="small"
              color="blue-gray"
              className="-mb-o"
            >
              Format
            </Typography>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="">All</option>
              <option value="paperback">Paperback</option>
              <option value="hardcover">Hard Cover</option>
              <option value="e-book">E-Book</option>
             
            </select>
          </div>

          {/* Language Select */}
          <div className="relative inline-block w-52">
            <Typography
              placeholder={""}
              variant="small"
              color="blue-gray"
              className="-mb-o"
            >
              Language
            </Typography>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">All</option>
              <option value="English">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">Bangla</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(
              (
                {
                  productName,
                  author,
                  productPrice,
                  productQuantity,
                  ISBN,
                  genre,
                  id,
                }: Product,
                index: number
              ) => {
                const isLast: boolean = index === products.length - 1;
                const classes: string = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={ISBN}>
                    <td className={classes}>
                      <Checkbox crossOrigin={""} />
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {author}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {productPrice}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {productQuantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {genre}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <ModalForm name={productName} id={id} />
                    </td>
                    <td className={classes}>
                      <Button
                        placeholder={""}
                        color="red"
                        size="sm"
                        onClick={() => {
                          deletePost(id);
                          toast.success("Deleted successfully");
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
