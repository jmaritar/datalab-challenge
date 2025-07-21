"use client";

import * as React from "react";
import { TrendingUp, DollarSign, Eye, Target, Megaphone } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    impresiones: 179630344,
    inversion: 121215.879,
    versiones: 102028,
    anuncios: 37137,
    alcance: 98735045,
  },
  {
    nombre: "tigo",
    impresiones: 117007060,
    inversion: 151781.8865,
    versiones: 40420,
    anuncios: 20403,
    alcance: 62718768,
  },
];

interface PieGraphProps {
  brand: string;
}

const BRAND_COLORS = {
  tigo: "var(--chart-1)",
  claro: "var(--chart-2)",
};

const METRIC_COLORS = {
  tigo: [
    "var(--chart-2)", // Inversión
    "var(--chart-3)", // Impresiones
    "var(--chart-4)", // Alcance
    "var(--chart-5)", // Anuncios
  ],
  claro: [
    "var(--chart-1)", // Inversión
    "var(--chart-3)", // Impresiones
    "var(--chart-4)", // Alcance
    "var(--chart-5)", // Anuncios
  ],
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

const formatThousands = (num: number): string => {
  return `${(num / 1000).toFixed(1)}K`;
};

const getMetricIcon = (metricId: string) => {
  switch (metricId) {
    case "inversion":
      return <DollarSign className="h-4 w-4" />;
    case "impresiones":
      return <Eye className="h-4 w-4" />;
    case "alcance":
      return <Target className="h-4 w-4" />;
    case "anuncios":
      return <Megaphone className="h-4 w-4" />;
    default:
      return <TrendingUp className="h-4 w-4" />;
  }
};

export function PieGraph({ brand }: PieGraphProps) {
  const [isClient, setIsClient] = React.useState(false);
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    setIsClient(true);
    let data: any[] = [];

    if (brand === "all" || brand === "") {
      data = apiData.map((item) => ({
        name: item.nombre.toUpperCase(),
        value: Math.round(item.inversion * 100) / 100,
        fill: BRAND_COLORS[item.nombre as keyof typeof BRAND_COLORS],
        displayValue: formatCurrency(item.inversion),
        id: item.nombre,
        rawValue: item.inversion,
      }));
    } else {
      const selectedBrand = apiData.find((item) => item.nombre === brand);
      if (selectedBrand) {
        const maxValue = Math.max(
          selectedBrand.inversion,
          selectedBrand.impresiones / 1000000,
          selectedBrand.alcance / 1000000,
          selectedBrand.anuncios / 1000
        );

        const brandColors = METRIC_COLORS[brand as keyof typeof METRIC_COLORS];

        data = [
          {
            name: "Inversión",
            value: (selectedBrand.inversion / maxValue) * 100,
            fill: brandColors[0],
            displayValue: formatCurrency(selectedBrand.inversion),
            id: "inversion",
            rawValue: selectedBrand.inversion,
            unit: "Quetzales",
          },
          {
            name: "Impresiones",
            value: (selectedBrand.impresiones / 1000000 / maxValue) * 100,
            fill: brandColors[1],
            displayValue: formatMillions(selectedBrand.impresiones),
            id: "impresiones",
            rawValue: selectedBrand.impresiones,
            unit: "Visualizaciones",
          },
          {
            name: "Alcance",
            value: (selectedBrand.alcance / 1000000 / maxValue) * 100,
            fill: brandColors[2],
            displayValue: formatMillions(selectedBrand.alcance),
            id: "alcance",
            rawValue: selectedBrand.alcance,
            unit: "Personas alcanzadas",
          },
          {
            name: "Anuncios",
            value: (selectedBrand.anuncios / 1000 / maxValue) * 100,
            fill: brandColors[3],
            displayValue: formatThousands(selectedBrand.anuncios),
            id: "anuncios",
            rawValue: selectedBrand.anuncios,
            unit: "Anuncios publicados",
          },
        ];
      }
    }

    setChartData(data);
  }, [brand]);

  if (!isClient) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Cargando análisis...</CardTitle>
          <CardDescription>Preparando datos publicitarios</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square max-h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Sin datos disponibles</CardTitle>
          <CardDescription>
            No se encontraron datos para la marca seleccionada
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const topItem = chartData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  const getTitle = () => {
    if (brand === "all" || brand === "") {
      return "Inversión Publicitaria por Marca";
    }
    return `Análisis de Rendimiento - ${brand.toUpperCase()}`;
  };

  const getDescription = () => {
    if (brand === "all" || brand === "") {
      return "Comparativa de inversión total entre operadoras";
    }
    return `Distribución de métricas publicitarias de ${brand}`;
  };

  const getFooterContent = () => {
    if (brand === "all" || brand === "") {
      const totalInvestment = chartData.reduce(
        (acc, curr) => acc + curr.rawValue,
        0
      );
      const leader = chartData.find(
        (item) =>
          item.rawValue === Math.max(...chartData.map((d) => d.rawValue))
      );
      return {
        mainText: `${leader?.name} invirtió ${(
          (leader?.rawValue / totalInvestment) *
          100
        ).toFixed(1)}% del total`,
        subText: `Inversión total: ${formatCurrency(totalInvestment)}`,
        icon: <DollarSign className="h-4 w-4" />,
      };
    } else {
      const selectedBrand = apiData.find((item) => item.nombre === brand);
      if (selectedBrand) {
        return {
          mainText: `${formatCurrency(
            selectedBrand.inversion
          )} invertidos en publicidad`,
          subText: `${formatMillions(
            selectedBrand.impresiones
          )} impresiones generadas`,
          icon: <TrendingUp className="h-4 w-4" />,
        };
      }
    }
    return { mainText: "", subText: "", icon: null };
  };

  const footerContent = getFooterContent();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            value: {
              label: "Valor",
            },
          }}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <defs>
              {chartData.map((item, index) => (
                <linearGradient
                  key={item.id}
                  id={`fill${item.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={item.fill} />
                  <stop offset="100%" stopColor={item.fill} />
                </linearGradient>
              ))}
            </defs>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => {
                    const total = chartData.reduce(
                      (acc, curr) => acc + curr.value,
                      0
                    );
                    const percentage = (
                      (props.payload?.value / total) *
                      100
                    ).toFixed(1);
                    return [`${percentage}% `, name];
                  }}
                />
              }
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.id})`,
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              strokeWidth={2}
              stroke="var(--background)"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-4 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {footerContent.mainText}
          {footerContent.icon}
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-3">
            {chartData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex items-center gap-2 flex-1">
                  {getMetricIcon(item.id)}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {item.displayValue}
                  </div>
                  {item.unit && (
                    <div className="text-xs text-muted-foreground">
                      {item.unit}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="leading-none text-muted-foreground text-center">
          {footerContent.subText}
        </div>
      </CardFooter>
    </Card>
  );
}
