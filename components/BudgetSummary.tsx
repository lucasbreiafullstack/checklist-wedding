import { Budget } from '../utils/types';

type BudgetSummaryProps = {
  budget: Budget;
};

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-olive">
    <h2 className="text-xl font-bold text-olive">Resumo do Orçamento</h2>
    <p className="text-black mt-2">
      <span className="font-semibold">Total:</span> R$ {budget.total.toFixed(2)}
    </p>
    <p className="text-black mt-1">
      <span className="font-semibold">Restante:</span> R$ {budget.remaining.toFixed(2)}
    </p>
  </div>
);

export default BudgetSummary;
