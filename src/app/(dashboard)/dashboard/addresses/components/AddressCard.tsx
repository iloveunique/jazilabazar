// react
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { IAddress } from '@/types';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  address: IAddress;
  label?: React.ReactNode;
  featured?: boolean;
  loading?: boolean;
  footer?: React.ReactNode;
}

function AddressCard(props: Props) {
  const {
    address,
    label,
    featured = false,
    loading = false,
    className,
    footer,
    ...rootProps
  } = props;
  
  return (
    <Card className={cn('min-h-[350px] p-2', rootProps)}>
      
      <CardContent className='flex flex-col gap-3'>
      <span className="text-foreground text-md !text-right mt-3 uppercase ">{label}</span>
        <div className='text-gray-800 font-bold'>{address?.name}</div>
        <div className='flex text-gray-500 text-lg'>
          {address.country}

          <br />
          {`${address.postcode}, ${address.city}`}
          <br />
          {address.street}
        </div>
        <div className='flex flex-col  '>
          <div className='text-lg text-gray-500 '>
            <span>Phone Number</span>
          </div>
          <div className='text-lg text-gray-500  font-bold'>{address.phone}</div>
        </div>
        <div className='flex flex-col '>
          <div className='text-lg text-gray-600'>
            <span>Email Address</span>
          </div>
          <div className='text-lg text-gray-500  font-bold'>{address.email}</div>
        </div>

        {footer && <div className='mt-7'>{footer}</div>}
      </CardContent>
    </Card>
  );
}

export default AddressCard;
