import { useState } from 'react';

type EditBudgetFormProps = {
  currentTotal: number;
  onUpdateTotal: (newTotal: number) => void;
};

const EditBudgetForm: React.FC<EditBudgetFormProps> = ({
  currentTotal,
  onUpdateTotal,
}) => {
  const [newTotal, setNewTotal] = useState<number>(currentTotal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTotal >= 0) {
      onUpdateTotal(newTotal); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-olive space-y-4"
    >
      <h2 className="text-xl font-bold text-olive">Editar Orçamento</h2>
      <div className="flex gap-4 items-center">
        <label htmlFor="budget" className="text-sm font-semibold">
          Total do Orçamento:
        </label>
        <input
          type="number"
          id="budget"
          value={newTotal}
          onChange={(e) => setNewTotal(parseFloat(e.target.value))}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-olive text-white rounded-md hover:bg-olive-light transition"
      >
        Atualizar Orçamento
      </button>
    </form>
  );
};

export default EditBudgetForm;
