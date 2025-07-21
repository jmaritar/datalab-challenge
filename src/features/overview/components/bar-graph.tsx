"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const apiData = [
  {
    nombre: "claro",
    tipo: "text",
    impresiones: "14539372",
    inversion: 9594.485,
    versiones: "6894",
    anuncios: "2778",
  },
  {
    nombre: "claro",
    tipo: "display",
    impresiones: "111794515",
    inversion: 75776.0569999998,
    versiones: "72154",
    anuncios: "23960",
  },
  {
    nombre: "tigo",
    tipo: "video",
    impresiones: "16458163",
    inversion: 17452.0626,
    versiones: "3542",
    anuncios: "2189",
  },
  {
    nombre: "tigo",
    tipo: "display",
    impresiones: "97493138",
    inversion: 131723.2939,
    versiones: "35330",
    anuncios: "17698",
  },
  {
    nombre: "claro",
    tipo: "video",
    impresiones: "53296457",
    inversion: 35845.337,
    versiones: "22980",
    anuncios: "10399",
  },
  {
    nombre: "tigo",
    tipo: "text",
    impresiones: "3055759",
    inversion: 2606.53,
    versiones: "1548",
    anuncios: "516",
  },
];

interface BarGraphProps {
  brand: string;
}

const CONTENT_TYPE_COLORS = {
  video: "var(--chart-3)",
  text: "var(--chart-4)",
  display: "var(--chart-5)",
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("es-GT").format(num);
};

const formatCurrency = (num: number): string => {
  return `Q ${formatNumber(Math.round(num))}`;
};

const formatMillions = (num: number): string => {
  return `${(num / 1000000).toFixed(1)}M`;
};

export function BarGraph({ brand }: BarGraphProps) {
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    let data: any[] = [];

    if (brand === "all") {
      // @ts-ignore
      const brands = [...new Set(apiData.map((item) => item.nombre))];

      data = brands.map((brandName) => {
        const brandData = apiData.filter((item) => item.nombre === brandName);
        const totalInversion = brandData.reduce(
          (sum, item) => sum + item.inversion,
          0
        );

        const result: any = {
          name: brandName.toUpperCase(),
          brand: brandName,
        };

        const contentTypes = ["video", "text", "display"];
        contentTypes.forEach((tipo) => {
          const tipoData = brandData.find((item) => item.tipo === tipo);
          const percentage = tipoData
            ? (tipoData.inversion / totalInversion) * 100
            : 0;
          result[tipo] = Math.round(percentage * 10) / 10;
          result[`${tipo}_raw`] = tipoData ? tipoData.inversion : 0;
          result[`${tipo}_impresiones`] = tipoData
            ? Number.parseInt(tipoData.impresiones)
            : 0;
        });

        return result;
      });
    } else {
      const brandData = apiData.filter((item) => item.nombre === brand);
      const totalInversion = brandData.reduce(
        (sum, item) => sum + item.inversion,
        0
      );

      const result: any = {
        name: brand.toUpperCase(),
        brand: brand,
      };

      const contentTypes = ["video", "text", "display"];
      contentTypes.forEach((tipo) => {
        const tipoData = brandData.find((item) => item.tipo === tipo);
        const percentage = tipoData
          ? (tipoData.inversion / totalInversion) * 100
          : 0;
        result[tipo] = Math.round(percentage * 10) / 10;
        result[`${tipo}_raw`] = tipoData ? tipoData.inversion : 0;
        result[`${tipo}_impresiones`] = tipoData
          ? Number.parseInt(tipoData.impresiones)
          : 0;
      });

      data = [result];
    }

    setChartData(data);
  }, [brand]);

  const getTotalInvestment = () => {
    if (brand === "all") {
      return apiData.reduce((sum, item) => sum + item.inversion, 0);
    } else {
      return apiData
        .filter((item) => item.nombre === brand)
        .reduce((sum, item) => sum + item.inversion, 0);
    }
  };

  const getTopContentType = () => {
    const contentTypeTotals = {
      video: 0,
      text: 0,
      display: 0,
    };

    const relevantData =
      brand === "all"
        ? apiData
        : apiData.filter((item) => item.nombre === brand);

    relevantData.forEach((item) => {
      contentTypeTotals[item.tipo as keyof typeof contentTypeTotals] +=
        item.inversion;
    });

    const topType = Object.entries(contentTypeTotals).reduce((a, b) =>
      contentTypeTotals[a[0] as keyof typeof contentTypeTotals] >
      contentTypeTotals[b[0] as keyof typeof contentTypeTotals]
        ? a
        : b
    );

    return {
      type: topType[0],
      amount: topType[1],
      percentage: (topType[1] / getTotalInvestment()) * 100,
    };
  };

  const topContentType = getTopContentType();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tipos de contenido</CardTitle>
        <CardDescription>Distribución por tipo de contenido</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            video: {
              label: "Video",
              color: CONTENT_TYPE_COLORS.video,
            },
            text: {
              label: "Text",
              color: CONTENT_TYPE_COLORS.text,
            },
            display: {
              label: "Display",
              color: CONTENT_TYPE_COLORS.display,
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
              maxBarSize={60}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={40}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      const rawValue = props.payload?.[`${name}_raw`] || 0;
                      const impresiones =
                        props.payload?.[`${name}_impresiones`] || 0;
                      return [
                        <div key={name} className="flex flex-col">
                          <span>{`${value}%`}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatCurrency(rawValue)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatMillions(impresiones)} impresiones
                          </span>
                        </div>,
                        name,
                      ];
                    }}
                  />
                }
              />
              <Bar
                dataKey="video"
                stackId="content"
                fill="var(--color-video)"
                name="Video"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="text"
                stackId="content"
                fill="var(--color-text)"
                name="Text"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="display"
                stackId="content"
                fill="var(--color-display)"
                name="Display"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardContent className="pt-0">
        {/* Leyenda personalizada */}
        <div className="flex justify-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CONTENT_TYPE_COLORS.video }}
            />
            <span className="text-xs font-medium">video</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CONTENT_TYPE_COLORS.text }}
            />
            <span className="text-xs font-medium">text</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CONTENT_TYPE_COLORS.display }}
            />
            <span className="text-xs font-medium">display</span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="text-center space-y-1">
          <div className="text-xs text-muted-foreground">
            Total: {formatCurrency(getTotalInvestment())}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
