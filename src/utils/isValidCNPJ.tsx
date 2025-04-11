export const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) return false;

  let soma = 0;
  let peso = 5;

  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  const digito1 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  if (digito1 !== parseInt(cnpj[12])) return false;

  soma = 0;
  peso = 6;

  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  const digito2 = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  return digito2 === parseInt(cnpj[13]);
};

export const formatCNPJ = (cnpj: string): string => {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Aplica a formatação se o CNPJ tiver 14 dígitos
  if (cnpj.length <= 14) {
    if (cnpj.length <= 2) return cnpj;
    if (cnpj.length <= 5) return cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    if (cnpj.length <= 8) return cnpj.replace(/(\d{2})(\d{3})(\d)/, '$1.$2.$3');
    if (cnpj.length <= 12) return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3/$4');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  }
  
  return cnpj; // Retorna sem formatação se não tiver até 14 caracteres
};

