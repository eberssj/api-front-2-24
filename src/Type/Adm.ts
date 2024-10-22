/* eslint-disable @typescript-eslint/no-explicit-any */
import { Telefone } from "./Telefone";

export interface AdmProps {
    id?: number,
    nome?: string,
    email?: string,
    cpf?: string,
    telefone?: Telefone,
    senha?: string,
    tipo?: any,
    dataCadastro?: Date,
    sub?: string,
    ativo?: boolean,
    token?: string,
}