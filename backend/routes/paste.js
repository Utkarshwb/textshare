import express from 'express';
import { db } from '../db/index.js';
import { pastes } from '../db/schema.js';
import { eq, lt, sql } from 'drizzle-orm';

export const pasteRouter = express.Router();

function isValid(input){
    const regex = /^[a-z0-9-]+$/;
    return regex.test(input);
}

pasteRouter.post('/paste', async (req, res) => {
    const { code, content } = req.body;

    if (!code || !content) {
        return res.status(400).json({ error: 'codename and content are required' });
    }
    
    const codename  = code.toLowerCase();

    if (!isValid(codename)) {
        return res.status(400).json({ error: 'invalid codename format' });
    }


    const codeExist = await db.select().from(pastes).where(eq(pastes.codename, codename));

    if (codeExist.length > 0) {
        return res.status(409).json({ error: 'codename already exists' });
    }

    const [codeName] = await db.insert(pastes).values({
        codename,
        content,
        expiresAt: sql`NOW() + INTERVAL '3 hours'`
    }).returning({ codename: pastes.codename });

    return res.status(201).json({ codename: codeName.codename });
});

pasteRouter.get('/paste/:codename',async (req,res)=>{
    const codename = req.params.codename;

    const content = await db.select().from(pastes).where(eq(pastes.codename,codename));

    if(content.length === 0){
        return res.status(404).json({ error: 'paste not found' })
    }

    return res.json({paste:content[0]})
    

})

pasteRouter.delete('/cleanup',async (req,res)=>{
    const deleted = await db.delete(pastes).where(lt(pastes.expiresAt,sql`NOW()`)).returning();

    return res.json({rowsDeleted:deleted.length})

})