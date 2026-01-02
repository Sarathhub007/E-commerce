import { Fragment, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, Ghost, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function ProductImageUpload({
  imagefile,
  setImagefile,
  setuploadedimageurl,
  setImageLodingState,
  imageLoadingState,
  isEditedMode,
}) {
  const inputref = useRef(null);

  function handleimagefilechange(e) {
    const file = e.target.files?.[0];
    if (file) setImagefile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImagefile(file);
  }

  function handleRemoveImage() {
    setImagefile(null);
    if (inputref.current) inputref.current.value = "";
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLodingState(true);
      const data = new FormData();
      data.append("my_file", imagefile);

      const res = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (res?.data?.success) {
        setuploadedimageurl(res.data.result.url);
        setImageLodingState(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (imagefile) uploadImageToCloudinary();
  }, [imagefile]);
  return (
    <Fragment>
      <div className="w-full max-w-md mx-auto mt-4">
        <Label className="text-lg font-semibold mb-2 block">
          {" "}
          upload image
        </Label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={` border-2 border-dashed rounded-lg p-4`}
        >
          <Input
            id="image-upload"
            type="file"
            className="hidden"
            ref={inputref}
            onChange={handleimagefilechange}
            disabled={isEditedMode}
          />
          {!imagefile ? (
            <Label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
              <UploadCloudIcon className={` w-10 h-10 ${
                isEditedMode ? " cursor-not-allowed " : ""
              }text-muted-foreground mb-2`} />
              <span> Drag & drop or click to upload image</span>
            </Label>
          ) : imageLoadingState ? (
            <Skeleton className="h-10 bg-green-100" />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{imagefile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductImageUpload;
