
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trophy, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getUsers } from './Index';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { collection, getDocs, onSnapshot,setDoc, doc, Timestamp } from "firebase/firestore";
import {db} from '../firebase/config'
import { v4 as uuidv4 } from 'uuid';

const SelectComponent = ({selectValue, selectLabel, options, onChange,  disabledOptions = []}) => {
  return (
    <Select onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue placeholder={selectValue} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{selectLabel}</SelectLabel>
        {options &&
            options
              .filter((op) => !disabledOptions.includes(op.displayName || `${op.firstName} ${op.lastName}`))
              .map((op) => {
                const label = op.displayName || `${op.firstName} ${op.lastName}`;
                return (
                  <SelectItem key={op.id} value={label}>
                    {label}
                  </SelectItem>
                );
              })}

     
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

const AddGame = () => {

  const { data: users, status } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [winner, setWinner] = useState(player1)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    // Game submission logic will be added later
    console.log("Game submitted:", {
      player1,
      player2,
      winner,
      date,
      time
    });


    saveGameRecord()
    // navigate("/");
  };

  async function saveGameRecord() {
    const docId = uuidv4();  
    const formattedDate = format(date, "yyyy-MM-dd");
    await setDoc(doc(db, "games", docId), {
      id: docId,
      player1,
      player2,
      winner,
      date: formattedDate,
      time,
    });
  }

  const isFormValid = player1 && player2 && winner && date ;

  return (
   users && <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Add New Game
            </h1>
            <p className="text-gray-600">Record a new billiards match</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-600" />
              Game Details
            </CardTitle>
            <CardDescription>
              Enter the details of the billiards match
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Players Section */}
              <div className="flex items-center gap-6">
              <SelectComponent  disabledOptions={[player2]} selectValue={'Player 1'} selectLabel={'Players'} options={users} onChange={setPlayer1}/>
              <SelectComponent  disabledOptions={[player1]} selectValue={'Player 2'} selectLabel={'Players'} options={users} onChange={setPlayer2}/>
            
              </div>

              {/* Scores Section */}
              {player1.length > 0 && player2.length > 0 && <div className="flex flex-col gap-6">
               <h4>Who won?</h4>
               <div className='flex items-center gap-4 justify-between'>
               <Button type='button' onClick={() => setWinner('player1')} variant={winner === 'player1' ? 'winner' :  'outline'} className='flex-1'>{player1}</Button>
               <Button type='button'  onClick={() => setWinner('player2')} variant={winner === 'player2' ? 'winner' :  'outline'} className='flex-1'>{player2}</Button>
               </div>
               
              </div>}

              {/* Date and Time Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Game Date</Label>
                  <Popover  open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-green-200 hover:border-green-500",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setIsCalendarOpen(false); // ✅ close the popover after selecting
                        }}
                        
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Game Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Winner Display */}
              {score1 && score2 && Number(score1) !== Number(score2) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Winner: {Number(score1) > Number(score2) ? player1 || "Player 1" : player2 || "Player 2"}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  Add Game Record
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddGame;
