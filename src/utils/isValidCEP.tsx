export const isValidCEP = (cep: string): boolean => {
  // Remove caracteres não numéricos
  cep = cep.replace(/[^\d]+/g, '');

  // Verifica se o CEP tem 8 dígitos
  if (cep.length !== 8) return false;

  // Verifica se o CEP não é uma sequência repetitiva
  const invalidSequences = [
    '00000000', '11111111', '22222222', '33333333', '44444444',
    '55555555', '66666666', '77777777', '88888888', '99999999',
  ];
  
  if (invalidSequences.includes(cep)) return false;

  return true; // CEP é válido
};

// Função para formatar CEP
export const formatCEP = (cep: string): string => {
  // Remove caracteres não numéricos
  cep = cep.replace(/[^\d]+/g, '');

  // Aplica a formatação se o CEP tiver 8 dígitos
  if (cep.length <= 5) return cep; // Retorna sem formatação se tiver menos de 5 dígitos
  if (cep.length <= 8) return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`; // Formato XXXXX-XXX
  
  return cep; // Retorna sem formatação se não tiver até 8 caracteres
};
