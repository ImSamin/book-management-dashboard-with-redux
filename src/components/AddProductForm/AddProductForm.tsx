import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProductMutation } from "../../redux/feature/products/productsApi";
import Container from "../Container";

interface FormData {
  addedBy: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  ISBN: string;
  genre: string;
  publisher: string;
  series?: string;
  language: string;
  format: string;
  pageCount: number;
  author: string;
  releaseDate: string;
}

const AddProductForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [addedProduct, { isLoading, isError, error }] = useAddProductMutation();

  const addProduct = async (data: FormData) => {
    data.addedBy = "65b1cd29ff8b19e1256016bf";
    data.productPrice = Number(data.productPrice);
    data.productQuantity = Number(data.productQuantity);
    data.pageCount = Number(data.pageCount);
    data.format = data.format.toLowerCase();
    data.genre = data.genre.toLowerCase();
    data.language = data.language.toLowerCase();

    await addedProduct(data);
    if (!isLoading && !isError) toast.success("Product Added Successfully");
    if (!isLoading && isError) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Container>
      <Card
        placeholder={""}
        variant="filled"
        shadow={true}
        className="w-full flex py-5 justify-center"
      >
        <form onSubmit={handleSubmit(addProduct)}>
          <div className="p-5 w-full max-w-screen-lg mx-auto">
            <div className="mx-auto w-2/3  ">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Product Name
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("productName", { required: true })}
                    size="md"
                    placeholder="Enter product name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Author Name
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("author", { required: true })}
                    size="md"
                    placeholder="Enter author name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Release Date
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="date"
                    {...register("releaseDate", { required: true })}
                    size="md"
                    placeholder="Enter  release date"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Product Price
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="number"
                    {...register("productPrice", { required: true })}
                    size="md"
                    placeholder="Enter product price"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Product Quantity
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="number"
                    {...register("productQuantity", { required: true })}
                    size="md"
                    placeholder="Enter Product Quantity"
                    className=" !border-t-blue-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    ISBN
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("ISBN", { required: true })}
                    size="md"
                    placeholder="Enter ISBN"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Genre
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("genre", { required: true })}
                    size="md"
                    placeholder="Enter genre"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Publisher
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("publisher", { required: true })}
                    size="md"
                    placeholder="Enter publisher"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Series
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("series", { required: false })}
                    size="md"
                    placeholder="Enter series"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Language
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="text"
                    {...register("language", { required: true })}
                    size="md"
                    placeholder="Enter language"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Format
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="select"
                    {...register("format", { required: true })}
                    size="md"
                    placeholder="Enter format"
                    className=" !border-t-blue-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="-mb-0"
                  >
                    Page Count
                  </Typography>
                  <Input
                    crossOrigin={""}
                    type="number"
                    {...register("pageCount", { required: true })}
                    size="md"
                    placeholder="Enter page count"
                    className=" !border-t-blue-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="col-span-12 lg:col-span-6 mt-6 float-end">
                  <Button
                    placeholder={""}
                    type="submit"
                    className="float-end w-full"
                    size="md"
                    color="blue"
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default AddProductForm;
