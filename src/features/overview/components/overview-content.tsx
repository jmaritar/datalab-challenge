"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieGraph } from "./pie-graph";
import { BarGraph } from "./bar-graph";
import { LineGraph } from "./line-graph";

export function OverviewContent() {
  const [brand, setBrand] = React.useState<string>("all");

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Resumen de Rendimiento Publicitario{" "}
          {brand !== "all" ? `- ${brand.toUpperCase()}` : ""}
        </h2>

        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona una marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Marcas</SelectLabel>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="tigo">Tigo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <div className="col-span-4">
          <PieGraph brand={brand} />
        </div>
        <div className="col-span-4">
          <BarGraph brand={brand} />
        </div>
        <div className="col-span-full lg:col-span-6">
          <LineGraph brand={brand} />
        </div>
      </div>
    </div>
  );
}
