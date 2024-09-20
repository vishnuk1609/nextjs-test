'use client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ModeT, UserT } from '@/app/TestComponent';
import { zodResolver } from '@hookform/resolvers/zod';

type PersonModalProps = {
  mode: ModeT;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  initialData?: UserT;
  users: UserT[];
  setUsers: Dispatch<SetStateAction<UserT[]>>;
};

const UserSchema = z.object({
  name: z.string().min(3, { message: 'Name must contain at least 3 characters' }),
  address: z.string().min(5, { message: 'Address must contain at least 5 characters' })
});

const PersonModal = ({ show, setShow, setUsers, users, mode, initialData }: PersonModalProps) => {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues:
      initialData && mode === 'edit'
        ? {
            name: initialData?.name,
            address: initialData?.address
          }
        : {
            name: '',
            address: ''
          }
  });

  useEffect(() => {
    if (initialData && mode === 'edit') {
      form.reset({ name: initialData?.name, address: initialData?.address });
    } else {
      form.reset({ name: '', address: '' });
    }
  }, [mode]);

  function addUser(values: { name: string; address: string }) {
    setUsers([...users, { ...values, id: users.length }]);
    form.reset();
    setShow(false);
  }

  const editUser = (id: number, updatedUser: Partial<UserT>) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)));
    form.reset();
    setShow(false);
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserSchema>) {
    mode === 'create' ? addUser(values) : editUser(initialData?.id!, values);
  }
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you &apos; re done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Name <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Description
                    <span className='text-xs'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter category description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonModal;
