import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Budget, ChecklistItem } from "../utils/types";
import BudgetSummary from "../components/BudgetSummary";
import AddItemForm from "../components/AddItemForm";
import ChecklistItemComponent from "../components/ChecklistItem";
import EditBudgetForm from "../components/EditBudgetForm";

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [budget, setBudget] = useLocalStorage<Budget>("budget", {
    total: 1000,
    remaining: 1000,
  });

  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>(
    "checklist",
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddItem = (name: string, price: number) => {
    const newItem: ChecklistItem = {
      id: Math.random().toString(),
      name,
      price,
      purchased: false,
    };
    setChecklist([...checklist, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    const itemToRemove = checklist.find((item) => item.id === id);
    if (itemToRemove && itemToRemove.purchased) {
      setBudget((prev: Budget) => ({
        ...prev,
        remaining: prev.remaining + itemToRemove.price,
      }));
    }
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );

    const toggledItem = checklist.find((item) => item.id === id);
    if (toggledItem) {
      setBudget((prev: Budget) => ({
        ...prev, // Mantém o valor total
        remaining: toggledItem.purchased
          ? prev.remaining + toggledItem.price // Reverte o valor se o item foi desmarcado
          : prev.remaining - toggledItem.price, // Subtrai se o item foi comprado
      }));
    }
  };
  
  const handleUpdateTotal = (newTotal: number) => {
    const spent = budget.total - budget.remaining;
    setBudget({
      total: newTotal,
      remaining: newTotal - spent,
    });
  };

  const handleEditItem = (
    id: string,
    updatedName: string,
    updatedPrice: number
  ) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id
          ? { ...item, name: updatedName, price: updatedPrice }
          : item
      )
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-olive text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Orçamento e Checklist</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <BudgetSummary budget={budget} />
        <EditBudgetForm
          currentTotal={budget.total}
          onUpdateTotal={handleUpdateTotal}
        />
        <AddItemForm onAddItem={handleAddItem} />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-olive mb-4">
            Lista de Itens
          </h2>
          {checklist.length > 0 ? (
            <ul className="space-y-4">
              {checklist.map((item) => (
                <ChecklistItemComponent
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEditItem}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum item na checklist.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
