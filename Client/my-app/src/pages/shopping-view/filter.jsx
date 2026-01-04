import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { Fragment } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
function ProductFilter({ filter, handlefilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">filter</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
            </div>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((option) => (
                <Label className="flex items-center gap-2 font-medium">
                  <Checkbox
                    onCheckedChange={() => handlefilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
