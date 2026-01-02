import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useEffect, useState } from "react";
import ProductImageUpload from "@/components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";
import AdminProductsTile from "@/components/admin/product-tile";

const initialFormData = {
  image: null,
  title: " ",
  description: " ",
  category: "",
  brand: "",
  price: " ",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [OpenCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imagefile, setImagefile] = useState(null);
  const [uploadedimageurl, setuploadedimageurl] = useState(null);
  const [imageLoadingState, setImageLodingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminproducts);

  const dispatch = useDispatch();
  const { toast } = useToast();



function handleDelete(getCurrentProductId){
  console.log(getCurrentProductId)
  dispatch(deleteProduct(getCurrentProductId)).then(data=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts());
    }
  })

}



  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edited data");
          if (data?.payload.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProduct(false);
            setFormData(initialFormData);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedimageurl,
          })
        ).then((data) => {
          if (data?.payload.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProduct(false);
            setImagefile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, "productList");

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          {" "}
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductsTile
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={setFormData}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={OpenCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imagefile={imagefile}
            setImagefile={setImagefile}
            uploadedimageurl={uploadedimageurl}
            setuploadedimageurl={setuploadedimageurl}
            setImageLodingState={setImageLodingState}
            imageLoadingState={imageLoadingState}
            isEditedMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
