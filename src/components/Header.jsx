/* eslint-disable @next/next/no-img-element */
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './ui/button';
import { HiCamera } from 'react-icons/hi';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="hidden lg:inline-flex">
          <Image src="/logo.webp" alt="Instagram logo" width={96} height={96} />
        </Link>
        <Link href="/" className="lg:hidden">
          <Image
            src="/logo1.webp"
            alt="Instagram logo"
            width={40}
            height={40}
          />
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {session ? (
          <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="rounded-full cursor-pointer h-10 w-10"
              // onClick={signOut}
            />
            <Button
              onClick={signOut}
              className="text-sm font-semibold text-white border py-2 px-2 rounded-lg"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button onClick={signIn} className="text-sm font-semibold text-white">
            Sign In
          </Button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white rounded-lg shadow-lg border-2 border-gray-200"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <HiCamera className="text-5xl text-gray-600 cursor-pointer" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Please enter your caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
          />
          <button className="w-full bg-teal-700 text-white font-semibold p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>
          <AiOutlineClose
            className="absolute cursor-pointer top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
