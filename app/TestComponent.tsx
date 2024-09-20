'use client';
import PersonModal from '@/components/modal/PersonModal';
import { Button } from '@/components/ui/button';

import { useState } from 'react';

export type UserT = {
  id: number;
  name: string;
  address: string;
};

export type ModeT = 'create' | 'edit';

export function TestComponent() {
  const [users, setUsers] = useState<UserT[]>([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, Springfield, IL 62701'
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Oak Ave, Madison, WI 53703'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      address: '789 Pine Rd, Austin, TX 73301'
    },
    {
      id: 4,
      name: 'Michael Brown',
      address: '101 Maple Blvd, Seattle, WA 98101'
    },
    {
      id: 5,
      name: 'Sarah Davis',
      address: '202 Birch Ln, Denver, CO 80203'
    }
  ]);
  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<ModeT>('create');
  const [data, setData] = useState<UserT | undefined>();

  const onEdit = (data: UserT) => {
    console.log('onEdit data =>', data);
    setData(data);
    setMode('edit');
    setShow(true);
  };

  const toggleModal = () => setShow((prev) => !prev);

  return (
    <>
      <Button
        onClick={() => {
          setMode('create');
          setData(undefined);
          toggleModal();
        }}
      >
        Add User
      </Button>
      <PersonModal
        mode={mode}
        show={show}
        setShow={setShow}
        users={users}
        setUsers={setUsers}
        initialData={data ? data : undefined}
      />
      <div className='mt-10'>
        {users.map((user) => (
          <div key={user.id} className='flex mb-3'>
            <p className='w-10'>{user.id}</p>
            <p className='min-w-[300px]'>{user.name}</p>
            <p className='min-w-[400px]'>{user.address}</p>
            <Button
              variant='outline'
              onClick={() => {
                onEdit(user);
              }}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
