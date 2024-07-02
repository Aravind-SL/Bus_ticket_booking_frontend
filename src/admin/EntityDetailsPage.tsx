import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Store} from "@/stores";
import { useEffect, useState } from 'react';
import { ReactNode } from "react";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogTrigger,  DialogClose, DialogTitle, DialogFooter, DialogHeader, DialogContent} from "@/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import {ArrowLeftIcon} from "lucide-react";

interface EntityDetailPageProps<T> {
  heading: string,
  useData: Store<T>,
  id: EntityID,
  getId: (d: T) => EntityID
  details: (entity: T) =>  ReactNode,
  deletable: boolean,
  form?: (d: T) => ReactNode,
  action?: (d: T) => ReactNode
}

export function EntityDetailPage<T>({id, getId, action, heading , useData, details, form , deletable = false}: EntityDetailPageProps<T>){

  const items = useData((state) => state.items);
  const del = useData(state => state.delete);
  const [entity, setEntity ] = useState<T>();
  const nav = useNavigate();

  useEffect(() => {
    if (items) {
      let it = items.find((it) => getId(it).toString() === id)
      if (!it) nav(-1);
      setEntity(it);
    }
  }, [items]);

  const handleDelete = async () => {
    try {
      if (deletable){
        entity && await del(getId(entity));
        toast({
          title: "Successfully Deleted",
        });
      }
    } catch (e) {
      toast({
        title: "Failed to Delete",
      });

    }
  }

  return entity ?  (
    <section className="container flex flex-col items-start mt-16">
      <Button variant={'link'} className="px-0 w-13 h-13" onClick={() => nav(-1)}><ArrowLeftIcon className="w-13 h-13 text-secondary-foreground " /></Button>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
        <CardContent>
          {details(entity)}
        </CardContent>

      <CardFooter className="flex space-x-4">
        {action && action(entity)}
        {form &&
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} >Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Edit {heading}</DialogTitle></DialogHeader>
              {form(entity)}
            </DialogContent>
          </Dialog>
        }
        {deletable && 
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'destructive'}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are You Sure ?
                </DialogTitle>
                  <DialogDescription>This will delete {getId(entity)}</DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-center">
                <DialogClose asChild>
                  <Button variant={'destructive'} onClick={handleDelete}>Delete</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant={'secondary'}>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }

      </CardFooter>
      </Card>
    </section>
  ): <p>Error</p> 

}
