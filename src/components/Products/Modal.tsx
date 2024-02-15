import React from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddSaleHistoryMutation } from "../../redux/feature/SaleHistory/saleHistoryApi";
import { ISale } from "../../types/interfaces";

interface FormData {
  buyerName: string;
  productName: string;
  quantity: number;
  saleDate: string;
}

export function ModalForm({ name, id }: { name: string; id: string }) {
  const { handleSubmit, control } = useForm<FormData>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [addSaleHistory, { isLoading, isError, error }] =
    useAddSaleHistoryMutation();

  const onSubmit = async (data: FormData) => {
    const saleData: ISale = {
      productId: id,
      buyerName: data.buyerName,
      productName: data.productName,
      quantity: Number(data.quantity),
      saleDate: data.saleDate,
    };

    handleOpen();
    await addSaleHistory(saleData);

    if (!isLoading && !isError) {
      toast.success("Product sale successfully");
    } else if (!isLoading && isError) {
      toast.error("Product sale failed");
    } else {
      console.log(error);
    }
  };

  return (
    <>
      <Button placeholder={""} onClick={handleOpen} color="green" size="sm">
        Sell
      </Button>
      <Dialog
        placeholder={""}
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card placeholder={""} className="mx-auto w-full max-w-[24rem]">
          <CardBody placeholder={""} className="flex flex-col gap-3">
            <Typography placeholder={""} variant="h4" color="blue-gray">
              Sell Item Description
            </Typography>
            <Typography
              placeholder={""}
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Product Name, quantity, total, and sale date
            </Typography>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography placeholder={""} className="-mb-0" variant="h6">
                Buyer Name
              </Typography>
              <Controller
                name="buyerName"
                control={control}
                render={({ field }) => (
                  <Input
                    crossOrigin={""}
                    {...field}
                    label="Buyer Name"
                    size="lg"
                  />
                )}
              />
              <Typography placeholder={""} className="-mb-0" variant="h6">
                Product Name
              </Typography>
              <Controller
                defaultValue={name}
                name="productName"
                control={control}
                render={({ field }) => (
                  <Input
                    crossOrigin={""}
                    {...field}
                    label="Product Name"
                    size="lg"
                  />
                )}
              />
              <Typography placeholder={""} className="-mb-0" variant="h6">
                Product Quantity
              </Typography>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    crossOrigin={""}
                    type="number"
                    {...field}
                    label="Product Quantity"
                    size="lg"
                  />
                )}
              />
              <Typography placeholder={""} className="-mb-0" variant="h6">
                Sale Date
              </Typography>
              <Controller
                name="saleDate"
                control={control}
                render={({ field }) => (
                  <Input
                    crossOrigin={""}
                    type="date"
                    {...field}
                    label="Sale Date"
                    size="lg"
                  />
                )}
              />
              <Button
                placeholder={""}
                className="mt-3"
                type="submit"
                variant="gradient"
                fullWidth
              >
                Sell
              </Button>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
