"use client"

import * as React from "react"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const apiData = [
  {
    nombre: "tigo",
    date_trunc: "2025-05-18T00:00:00.000Z",
    impresiones: "1203349",
    inversion: 4968.4823,
    versiones: "1644",
    anuncios: "592",
    alcance: "658471",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-18T00:00:00.000Z",
    impresiones: "5168264",
    inversion: 3720.791,
    versiones: "2749",
    anuncios: "901",
    alcance: "3155832",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-19T00:00:00.000Z",
    impresiones: "1142359",
    inversion: 4702.2921,
    versiones: "1504",
    anuncios: "532",
    alcance: "603365",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-19T00:00:00.000Z",
    impresiones: "3966249",
    inversion: 2924.051,
    versiones: "2821",
    anuncios: "937",
    alcance: "2589486",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-20T00:00:00.000Z",
    impresiones: "4743855",
    inversion: 3411.314,
    versiones: "2853",
    anuncios: "953",
    alcance: "2781882",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-20T00:00:00.000Z",
    impresiones: "1187379",
    inversion: 5960.48,
    versiones: "1107",
    anuncios: "428",
    alcance: "664349",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-21T00:00:00.000Z",
    impresiones: "3885966",
    inversion: 2643.048,
    versiones: "2853",
    anuncios: "953",
    alcance: "2282490",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-21T00:00:00.000Z",
    impresiones: "1177689",
    inversion: 5450.9615,
    versiones: "1414",
    anuncios: "516",
    alcance: "576074",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-22T00:00:00.000Z",
    impresiones: "3775376",
    inversion: 2567.624,
    versiones: "2853",
    anuncios: "953",
    alcance: "2195481",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-22T00:00:00.000Z",
    impresiones: "1272066",
    inversion: 5275.3071,
    versiones: "1426",
    anuncios: "513",
    alcance: "698376",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-23T00:00:00.000Z",
    impresiones: "1894977",
    inversion: 7329.7189,
    versiones: "1147",
    anuncios: "654",
    alcance: "1103524",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-23T00:00:00.000Z",
    impresiones: "6570936",
    inversion: 4349.371,
    versiones: "3313",
    anuncios: "1181",
    alcance: "3717566",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-24T00:00:00.000Z",
    impresiones: "7266411",
    inversion: 4918.219,
    versiones: "3313",
    anuncios: "1181",
    alcance: "4153167",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-24T00:00:00.000Z",
    impresiones: "1519139",
    inversion: 5540.2272,
    versiones: "1187",
    anuncios: "553",
    alcance: "858096",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-25T00:00:00.000Z",
    impresiones: "6006021",
    inversion: 4071.727,
    versiones: "3313",
    anuncios: "1181",
    alcance: "3578953",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-25T00:00:00.000Z",
    impresiones: "1691719",
    inversion: 8033.4725,
    versiones: "1394",
    anuncios: "593",
    alcance: "985802",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-26T00:00:00.000Z",
    impresiones: "1528284",
    inversion: 6759.6194,
    versiones: "1143",
    anuncios: "519",
    alcance: "813356",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-26T00:00:00.000Z",
    impresiones: "5356263",
    inversion: 3787.1,
    versiones: "3454",
    anuncios: "1258",
    alcance: "3229322",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-27T00:00:00.000Z",
    impresiones: "1528938",
    inversion: 7228.5244,
    versiones: "1223",
    anuncios: "586",
    alcance: "782064",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-27T00:00:00.000Z",
    impresiones: "5059711",
    inversion: 3542.336,
    versiones: "3582",
    anuncios: "1322",
    alcance: "3036056",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-28T00:00:00.000Z",
    impresiones: "5477641",
    inversion: 3841.646,
    versiones: "3827",
    anuncios: "1455",
    alcance: "3136458",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-28T00:00:00.000Z",
    impresiones: "1536157",
    inversion: 6500.48110000002,
    versiones: "2653",
    anuncios: "537",
    alcance: "847600",
  },
  {
    nombre: "claro",
    date_trunc: "2025-05-29T00:00:00.000Z",
    impresiones: "6489189",
    inversion: 4494.234,
    versiones: "3827",
    anuncios: "1455",
    alcance: "3884145",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-29T00:00:00.000Z",
    impresiones: "5446991",
    inversion: 4852.96,
    versiones: "1201",
    anuncios: "703",
    alcance: "2767539",
  },
  {
    nombre: "tigo",
    date_trunc: "2025-05-30T00:00:00.000Z",
    impresiones: "5446991",
    inversion: 4852.96,
    versiones: "1201",
    anuncios: "703",
    alcance: "2767539",
  },
]

interface LineChartProps {
  brand: string
}

const BRAND_LINE_COLORS = {
  claro: "#ef4444", // Rojo
  tigo: "#3b82f6", // Azul
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("es-GT").format(num)
}

const formatCurrency = (num: number): string => {
  return `Q ${formatNumber(Math.round(num))}`
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-GT", { month: "2-digit", day: "2-digit" })
}

const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toString()
}

export function LineGraph({ brand }: LineChartProps) {
  const [chartData, setChartData] = React.useState<any[]>([])

  React.useEffect(() => {
    const dataByDate = new Map()

    const filteredData = brand === "all" ? apiData : apiData.filter((item) => item.nombre === brand)

    filteredData.forEach((item) => {
      const date = item.date_trunc.split("T")[0] 
      const key = date

      if (!dataByDate.has(key)) {
        dataByDate.set(key, {
          date: key,
          dateFormatted: formatDate(item.date_trunc),
        })
      }

      const dayData = dataByDate.get(key)
      dayData[item.nombre] = item.inversion
      dayData[`${item.nombre}_impresiones`] = Number.parseInt(item.impresiones)
      dayData[`${item.nombre}_alcance`] = Number.parseInt(item.alcance)
      dayData[`${item.nombre}_anuncios`] = Number.parseInt(item.anuncios)
    })

    const sortedData = Array.from(dataByDate.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    setChartData(sortedData)
  }, [brand])

  const getVisibleBrands = () => {
    if (brand === "all") {
      return ["claro", "tigo"]
    }
    return [brand]
  }

  const visibleBrands = getVisibleBrands()

  const getTotalInvestment = () => {
    return chartData.reduce((total, day) => {
      return total + visibleBrands.reduce((dayTotal, brandName) => dayTotal + (day[brandName] || 0), 0)
    }, 0)
  }

  const getAverageDaily = () => {
    const total = getTotalInvestment()
    return chartData.length > 0 ? total / chartData.length : 0
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Activaciones diarias</CardTitle>
        <CardDescription>Evolución de la inversión publicitaria por día</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            claro: {
              label: "Claro",
              color: BRAND_LINE_COLORS.claro,
            },
            tigo: {
              label: "Tigo",
              color: BRAND_LINE_COLORS.tigo,
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dateFormatted"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={formatYAxis} width={50} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      const brandName = name as string
                      const dayData = chartData.find((d) => d[brandName] === value)
                      return [
                        <div key={brandName} className="flex flex-col">
                          <span>{formatCurrency(Number(value))}</span>
                          {dayData && (
                            <>
                              <span className="text-xs text-muted-foreground">
                                {formatNumber(dayData[`${brandName}_impresiones`] || 0)} impresiones
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatNumber(dayData[`${brandName}_alcance`] || 0)} alcance
                              </span>
                            </>
                          )}
                        </div>,
                        brandName.charAt(0).toUpperCase() + brandName.slice(1),
                      ]
                    }}
                    labelFormatter={(label) => `Fecha: ${label}`}
                  />
                }
              />
              {visibleBrands.includes("claro") && (
                <Line
                  type="monotone"
                  dataKey="claro"
                  stroke={BRAND_LINE_COLORS.claro}
                  strokeWidth={2}
                  dot={{ fill: BRAND_LINE_COLORS.claro, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="claro"
                />
              )}
              {visibleBrands.includes("tigo") && (
                <Line
                  type="monotone"
                  dataKey="tigo"
                  stroke={BRAND_LINE_COLORS.tigo}
                  strokeWidth={2}
                  dot={{ fill: BRAND_LINE_COLORS.tigo, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="tigo"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardContent className="pt-0">
        {/* Leyenda personalizada */}
        <div className="flex justify-center gap-6 mb-3">
          {visibleBrands.includes("claro") && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BRAND_LINE_COLORS.claro }} />
              <span className="text-sm font-medium">claro</span>
            </div>
          )}
          {visibleBrands.includes("tigo") && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BRAND_LINE_COLORS.tigo }} />
              <span className="text-sm font-medium">tigo</span>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="text-center space-y-1">
          <div className="text-xs font-medium">Promedio diario: {formatCurrency(getAverageDaily())}</div>
          <div className="text-xs text-muted-foreground">Total del período: {formatCurrency(getTotalInvestment())}</div>
        </div>
      </CardContent>
    </Card>
  )
}
