import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.saleprice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div>
            <span className="text-sm text-muted-foreground ">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div>
            <span
              className={` ${
                product?.saleprice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.saleprice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.saleprice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" >
                Add To Cart
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
