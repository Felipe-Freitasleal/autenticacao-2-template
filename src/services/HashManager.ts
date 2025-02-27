import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    // gerar o hash
    public hash = async (plaintext: string) => { 
        const rounds = Number(process.env.BCRYPT_COST) // qual o custo/nível de segurança desejado
        const salt = await bcrypt.genSalt(rounds)// QUANTIDADE DE HASHS POSSÍVEIS PARA CADA SENHA

        // SENHA DIGITADA, NÍVEL DE SEGURANÇA
        const hash = await bcrypt.hash(plaintext, salt)

        return hash
    }

    // verificar se a senha está correta
    public compare = async (plaintext: string, hash: string) => { 
				// aqui não precisa do await porque o return já se comporta como um
        return bcrypt.compare(plaintext, hash)
    }
}