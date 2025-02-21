import { Button } from "@/components/ui/button";
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { experiencesOptions, monthsOptions, formatDate, tripModeOptions } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import TableSkeleton from "./TableSkeleton";

type Trip = {
  id: number;
  acf: {
    modo_de_viaje: string;
    fecha_de_inicio: string;
    fecha_de_fin: string;
    experiencia: string;
    lugar: string;
    precio: number;
  };
};

const defaultExperience = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get("experiencia") ?? undefined;
};

const defaultMonth = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get("mes") ?? undefined;
};

export default function CalendarPage() {
  const [incomingTrips, setIncomingTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | undefined>(defaultExperience);
  const [selectedMode, setSelectedMode] = useState<string | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(defaultMonth);

  const fetchCalendar = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedExperience) params.append("experiencia", selectedExperience);
    if (selectedMode) params.append("modo_de_viaje", selectedMode);
    if (selectedMonth) params.append("mes", selectedMonth.toString());

    setLoading(true);

    fetch(`https://indomito360.com/wp-json/wp/v2/calendario?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setIncomingTrips(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, [selectedExperience, selectedMode, selectedMonth]);

  const linkToRegister = useCallback(
    (experience: string, tripMode: string) => {
      const formUrl = "https://indomito360.com/encuentra-tu-experiencia";
      const params = new URLSearchParams();

      params.append("experiencia", experience);
      params.append("modo_de_viaje", tripMode.toLowerCase());

      return `${formUrl}/?${params.toString()}`;
    },
    [selectedExperience, selectedMode]
  );

  useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <section className="">
      <div className="flex max-md:flex-col bg-accent max-md:gap-y-2 items-center px-4 py-2 mb-12">
        <Select defaultValue={selectedExperience} onValueChange={(value) => setSelectedExperience(value)}>
          <SelectTrigger className="border-none px-0 focus:ring-0 bg-transparent text-accent-foreground">
            <SelectValue placeholder="Selecciona una experiencia" />
          </SelectTrigger>
          <SelectContent>
            {experiencesOptions.map((experience) => (
              <SelectItem key={experience.value} value={experience.label}>
                {experience.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Divider />
        <Select onValueChange={(value) => setSelectedMode(value)}>
          <SelectTrigger className="border-none px-0 focus:ring-0 bg-transparent text-accent-foreground">
            <SelectValue placeholder="¿Que modo de viaje prefieres?" />
          </SelectTrigger>
          <SelectContent>
            {tripModeOptions.map((option) => (
              <SelectItem key={option.value} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Divider />
        <Select defaultValue={selectedMonth} onValueChange={(value) => setSelectedMonth(value)}>
          <SelectTrigger className="border-none px-0 focus:ring-0 bg-transparent text-accent-foreground">
            <SelectValue placeholder="¿En que més quieres vivirla?" />
          </SelectTrigger>
          <SelectContent>
            {monthsOptions.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Divider />
        <Button onClick={fetchCalendar} className="bg-white text-inherit max-md:w-full max-md:mt-2">
          Encontrar
        </Button>
      </div>
      <h2 className="text-center text-2xl uppercase mb-5">
        Próximas <span className="font-bold">experiencias</span>
      </h2>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha de viaje</TableHead>
              <TableHead>Modo de viaje</TableHead>
              <TableHead>Experiencia</TableHead>
              <TableHead>Lugar</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {incomingTrips.length ? (
            <TableBody>
              {incomingTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    {formatDate(trip.acf.fecha_de_inicio)} al {formatDate(trip.acf.fecha_de_fin)}
                  </TableCell>
                  <TableCell>{trip.acf.modo_de_viaje}</TableCell>
                  <TableCell>{trip.acf.experiencia}</TableCell>
                  <TableCell>{trip.acf.lugar}</TableCell>
                  <TableCell>{trip.acf.precio} USD</TableCell>
                  <TableCell>
                    <a
                      className="text-secondary underline hover:opacity-70"
                      href={linkToRegister(trip.acf.experiencia, trip.acf.modo_de_viaje)}
                    >
                      Últimos lugares
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableCaption className="py-10">No se encontraron resultados</TableCaption>
          )}
        </Table>
      )}
    </section>
  );
}
function Divider() {
  return <div className="bg-white opacity-30 md:w-1 md:h-5 w-full h-px mx-4" />;
}
