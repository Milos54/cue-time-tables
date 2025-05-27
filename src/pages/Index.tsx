
import { Hero } from "@/components/Hero";
import { GamesSection } from "@/components/GamesSection";
import { RankingsSection } from "@/components/RankingsSection";
import { Navigation } from "@/components/Navigation";
import { AuthContextProvider } from '../context/AuthContext';
import { collection, getDocs, onSnapshot,setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from '../firebase/config'

export const getUsers = async () => {
  const ref = collection(db, 'users');
  const snapshot = await getDocs(ref);
  const results = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
  console.log(results);
  
  return results;
};

export const getGames = async () => {
  const ref = collection(db, 'games');
  const snapshot = await getDocs(ref);
  const results = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
  console.log(results);
  
  return results;
};
const Index = () => {

  

  

  
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Hero />
      <GamesSection />
      <RankingsSection />
    </div>
  );
};

export default Index;
