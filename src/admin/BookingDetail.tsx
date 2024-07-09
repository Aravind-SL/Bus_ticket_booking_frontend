import {API_URL} from '@/consts';
import { toast } from '@/components/ui/use-toast';
import {useState} from 'react';
import { Label } from '@/components/ui/label';
import {Dialog, DialogTitle, DialogTrigger, DialogDescription,
  DialogContent,DialogFooter,  DialogClose, DialogHeader} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useParams} from "react-router-dom"
import { EntityDetailPage } from "./EntityDetailsPage"
import { useBookings, useBuses } from "@/stores"
import {Input} from '@/components/ui/input';
import DetailsDisplay from '@/components/DetailsDisplay';
import axios from 'axios';

export const BookingDetailPage = () => {
  const {id} = useParams();
  const [reason, setReason] = useState<string>("");
  const fetchAll = useBookings(state => state.fetchAll);
  const findBus = useBuses(state => (id: EntityID) => state.items.find((b) => b.busId === id));

  const handleProcess = async (approved: boolean) => {
    try {
      await axios.post(
        API_URL+'/api/v1/bookings/approve',
        {
          bookingId: id,
          message: reason,
          approved,
        }
      )
        
      await fetchAll();
      toast({
        title: `Booking ${id} Processed`
      });
      

    } catch (e) {

      toast({
        title: "Failed to process" + id,
        description: <p>{e.message}</p>
      })
    }

  }

  return <EntityDetailPage
    heading="Booking"
    useData={useBookings}
    id={id}
    details={(entity) => (
      <DetailsDisplay
        keyValues = {[
          {
            key: "Booking Date",
            value: entity.bookingDate
          },
          {
            key: "User",
            value: entity.user.username
          },
          {
            key: "Bus",
            value: findBus(entity.busId)?.busNumber
          },
          {
            key: "Journey Date",
            value: entity.journeyDate
          }
        ]}
      />
    )}
    getId={(d) => d.id}
    action={(b) => b.status === "PENDING" ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button >Process</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Process
                </DialogTitle>
                  <DialogDescription>How are you willing to process this reservation.</DialogDescription>
              </DialogHeader>


              <Label>Reason of Action</Label>
              <Input value={reason} onChange={(e) => setReason(e.target.value)} />


              <DialogFooter className="flex justify-center">
                <DialogClose asChild>
                  <Button onClick={async () => await handleProcess(true)} >Approve</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant={'destructive'} onClick={async () => await handleProcess(false)}>Reject</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    ): <>Status {b.status}</>}

  />
}
