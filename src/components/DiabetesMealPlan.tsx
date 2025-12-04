import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, Sun, Moon } from "lucide-react";

interface Meal {
  name: string;
  calories: number;
}

interface DayPlan {
  day: string;
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}

const mealPlanData: DayPlan[] = [
  {
    day: "Day 1",
    breakfast: [
      { name: "Oats porridge", calories: 150 },
      { name: "Fruits", calories: 60 },
      { name: "Boiled egg", calories: 70 },
    ],
    lunch: [
      { name: "Brown rice", calories: 215 },
      { name: "Dal", calories: 150 },
      { name: "Bhindi sabzi", calories: 120 },
      { name: "Cucumber salad", calories: 40 },
    ],
    dinner: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Mixed veg curry", calories: 150 },
      { name: "Curd", calories: 60 },
    ],
  },
  {
    day: "Day 2",
    breakfast: [
      { name: "Vegetable upma", calories: 180 },
      { name: "Buttermilk", calories: 50 },
    ],
    lunch: [
      { name: "Millet roti (2)", calories: 220 },
      { name: "Dal tadka", calories: 150 },
      { name: "Lauki curry", calories: 80 },
    ],
    dinner: [
      { name: "Moong dal khichdi", calories: 250 },
      { name: "Tomato soup", calories: 70 },
    ],
  },
  {
    day: "Day 3",
    breakfast: [
      { name: "Besan chilla (2)", calories: 250 },
      { name: "Mint chutney", calories: 20 },
    ],
    lunch: [
      { name: "Veg pulao", calories: 300 },
      { name: "Curd", calories: 60 },
    ],
    dinner: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Palak paneer", calories: 250 },
      { name: "Salad", calories: 40 },
    ],
  },
  {
    day: "Day 4",
    breakfast: [
      { name: "Multigrain toast (2)", calories: 140 },
      { name: "Sprouts/egg", calories: 80 },
    ],
    lunch: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Rajma", calories: 250 },
      { name: "Cabbage sabzi", calories: 100 },
    ],
    dinner: [
      { name: "Oats soup", calories: 150 },
      { name: "Grilled paneer", calories: 180 },
    ],
  },
  {
    day: "Day 5",
    breakfast: [{ name: "Poha", calories: 200 }],
    lunch: [
      { name: "Lemon rice", calories: 280 },
      { name: "Dal", calories: 150 },
      { name: "Carrot-beans stir fry", calories: 100 },
    ],
    dinner: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Methi aloo", calories: 180 },
      { name: "Curd", calories: 60 },
    ],
  },
  {
    day: "Day 6",
    breakfast: [
      { name: "Idli (2)", calories: 140 },
      { name: "Sambar", calories: 80 },
      { name: "Chutney", calories: 40 },
    ],
    lunch: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Chole", calories: 280 },
      { name: "Salad", calories: 40 },
    ],
    dinner: [{ name: "Vegetable dalia", calories: 230 }],
  },
  {
    day: "Day 7",
    breakfast: [
      { name: "Omelette / Moong dal chilla", calories: 185 },
      { name: "Milk", calories: 80 },
    ],
    lunch: [
      { name: "Veg biryani", calories: 280 },
      { name: "Raita", calories: 60 },
    ],
    dinner: [
      { name: "Chapati (2)", calories: 200 },
      { name: "Mixed veg curry", calories: 150 },
      { name: "Soup", calories: 70 },
    ],
  },
];

const getTotalCalories = (meals: Meal[]) =>
  meals.reduce((sum, meal) => sum + meal.calories, 0);

const getDayTotalCalories = (day: DayPlan) =>
  getTotalCalories(day.breakfast) +
  getTotalCalories(day.lunch) +
  getTotalCalories(day.dinner);

const MealSection = ({
  title,
  icon: Icon,
  meals,
  colorClass,
}: {
  title: string;
  icon: typeof Coffee;
  meals: Meal[];
  colorClass: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${colorClass}`} />
      <span className="font-semibold text-sm">{title}</span>
      <Badge variant="outline" className="ml-auto text-xs">
        {getTotalCalories(meals)} kcal
      </Badge>
    </div>
    <ul className="pl-6 space-y-1">
      {meals.map((meal, idx) => (
        <li key={idx} className="text-sm text-muted-foreground flex justify-between">
          <span>{meal.name}</span>
          <span className="text-xs">{meal.calories} kcal</span>
        </li>
      ))}
    </ul>
  </div>
);

const DiabetesMealPlan = () => {
  return (
    <Card className="mb-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200/50 dark:border-emerald-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
            <Utensils className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg md:text-xl text-emerald-800 dark:text-emerald-200">
              Weekly Diabetes-Friendly Food Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Balanced meals with calorie counts for better health management
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {mealPlanData.map((day, index) => (
            <AccordionItem
              key={index}
              value={`day-${index}`}
              className="border rounded-lg bg-background/80 px-4 data-[state=open]:bg-background"
            >
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold">{day.day}</span>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 hover:bg-emerald-100">
                    ~{getDayTotalCalories(day)} kcal
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4 pt-2">
                  <MealSection
                    title="Breakfast"
                    icon={Coffee}
                    meals={day.breakfast}
                    colorClass="text-amber-500"
                  />
                  <MealSection
                    title="Lunch"
                    icon={Sun}
                    meals={day.lunch}
                    colorClass="text-orange-500"
                  />
                  <MealSection
                    title="Dinner"
                    icon={Moon}
                    meals={day.dinner}
                    colorClass="text-indigo-500"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default DiabetesMealPlan;
