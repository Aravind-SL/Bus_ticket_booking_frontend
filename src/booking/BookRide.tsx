import { toast } from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {useNavigate, useParams} from "react-router-dom";
import { useBuses } from "@/stores";
import {displayTime} from "@/utils";
import { Input } from "@/components/ui/input";
import {useFetch} from "@/utils/hooks";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Popover} from "@/components/ui/popover";
import {PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {CalendarIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Calendar} from "@/components/ui/calendar";
import {format} from "date-fns";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";
import axios from "axios";
import {API_URL} from "@/consts";


const BookingSchema = z.object({
  numberOfSeats: z.coerce.number().min(1),
  journeyDate: z.date(),
});



export const BookRide = () => {

  const {id} = useParams();
  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      numberOfSeats: 1
    }
  });

  const nav = useNavigate();

  const bus = useBuses(state => state.items.find(b => b.busId.toString() === id));
  const [date, setDate] = useState<Date>();

  const {isLoading, data: bookings, error } = useFetch<DailyBookingStatus[]>("api/v1/bookings/next/" + id);
  const [seatAvailable, setSeatsAvailable] = useState<number>();


  useEffect(() => {
    if (date){
      axios.get(
        `${API_URL}/api/v1/bookings/seatAvailable/${id}`, {
          data: date
        }
      ).then(res =>{
        setSeatsAvailable(res.data.seatsAvailable)
        console.log(res.data.seatsAvailable);
      });
    }

  }, [date]);


  const getStatusColor = (n: number) => {
      let percent = n / (bus?.totalSeats || -1) * 100;
      return percent === 0 ? 'gray' : percent < 40 ? 'red' : percent < 70 ? 'yellow' : 'green';
  }


  const onSubmit = async (data: z.infer<typeof BookingSchema>) => {

    try {
      await axios.post(API_URL+"/api/v1/bookings", {
        ...data,
        busId: id
      });

      nav(-1);
      toast({
        title: "Booking Made",
      });

    

    } catch (e) {

      toast({
        title: "Failed to Create Booking",
        description: <p>{e.message}</p>
      })
    }

  }
  
  return (
    <main className="flex w-full min-h-screen px-12 py-4">
      
      <section className="flex flex-col items-center justify-center space-y-4 ">
          <span className="inline-flex flex-col items-center">
            <span>{bus?.route.toStation.stationName}</span>
            <span>Arrives at {displayTime(bus?.arrivalTime)}</span>
          </span>
          <div className="flex flex-col items-center justify-center space-y-1 h-3/4">
            <div className="w-3 h-3 bg-primary"></div>
            <div className="w-1 h-full bg-primary"></div>
            <div className="w-3 h-3 bg-primary"></div>
          </div>
          <span className="inline-flex flex-col items-center">
            <span>{bus?.route.fromStation.stationName}</span>
            <span>Departs at {displayTime(bus?.departureTime)}</span>
          </span>
      </section>
      <section className="flex flex-col items-center justify-center flex-1 ">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Book Your Ride</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center space-y-12">
              {isLoading && <p>Status Loading...</p>}
              {error && <p>{error.message}</p>}
              {bookings && 

                <div>
                  <span className="font-semibold">The Next 7 days</span>
                  <ul className="flex mt-3 text-lg space-x-2">
                    {bookings.map((d) => 
                      <div key={d.date.toString()} className="flex flex-col items-center">
                        <span style={{background: getStatusColor(d.seatsAvailable)}}  className="flex items-center justify-center w-12 h-12 text-gray-300 rounded" >
                          {d.seatsAvailable}
                        </span>
                        <span className="text-base">
                          {d.date.toString().split('-').slice(1).join('/')}
                        </span>
                      </div>
                    )}
                  </ul>
                </div>
              }

              <Form {...form}>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-evenly space-y-8 ">
                <FormField
                  name="journeyDate"
                  control={form.control}
                  render={({field}) => (
                    <FormItem className="flex flex-col space-y-5">
                      <FormLabel>Journey Date</FormLabel>
                      <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button 
                                variant='outline'
                              >
                                <CalendarIcon />
                                <span className={`ms-4 ${!date && "text-muted-foreground"}`}>
                                  { date ? format(date, "PPP") : "Select Date" } 
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="center" >
                              <Calendar 
                                className="rounded bg-background border-muted-foreground "
                                mode="single"
                                selected={date}
                                onSelect={(d) => {setDate(d);form.setValue(field.name, d);}}
                                disabled={(date) => date <= new Date() }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                      </FormControl>

                      <FormMessage />

                    </FormItem>
                  )}
                />

                <FormField
                  name="numberOfSeats"
                  control={form.control}
                  render={({field}) => (
                    <FormItem className="flex flex-col space-y-5">
                      <FormLabel>No. of Seats</FormLabel>
                      {seatAvailable && <FormDescription>{seatAvailable} seats are available</FormDescription>}
                      <FormControl>
                        <Input   {...field} disabled={!seatAvailable || seatAvailable === 0} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}

                />

                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-5">
                  {form.formState.isSubmitting && (<ReloadIcon className="w-4 h-4 mr-2 animate-spin"/>)}
                  <span>Book</span> 
                </Button>
                </form>
              </Form>

          </CardContent>

        </Card>
      </section>
    </main>
  );

}
