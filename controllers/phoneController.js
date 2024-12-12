const Produto = require('../models/Phone');
const  DeletedPhone  = require('../models/DeletedPhone');

const listPhone = async (req, res) => {
  try {
    const phones = await Produto.findAll();
    res.json(phones);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar celulares' });
  }
};

const createPhone = async (req, res) => {
  try {
    console.log('Dados recebidos no servidor:', req.body);

    const { model, brand, price, startDate, endDate, color, code } = req.body;

    if (!model || !brand || !price || !startDate || !endDate || !color || !code) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: 'Preço deve ser numérico.' });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: 'Datas inválidas.' });
    }

    const newPhone = await Produto.create({
      model,
      brand,
      price: parsedPrice,
      startDate: parsedStartDate.toISOString().split('T')[0],
      endDate: parsedEndDate.toISOString().split('T')[0],
      color,
      code,
    });

    res.status(201).json(newPhone);
  } catch (error) {
    console.error('Erro ao criar celular:', error);
    res.status(500).json({ error: 'Erro ao criar celular' });
  }
};

const updatePhone = async (req, res) => {
  try {
    const { code } = req.params; 
    const { model, brand, price, startDate, endDate, color } = req.body; 

    const phone = await Produto.findOne({ where: { code } }); 

    if (phone) {
      phone.model = model || phone.model;
      phone.brand = brand || phone.brand;
      phone.price = price || phone.price;
      phone.startDate = startDate || phone.startDate;
      phone.endDate = endDate || phone.endDate;
      phone.color = color || phone.color;

      await phone.save(); 
      res.json(phone); 
    } else {
      res.status(404).json({ mensagem: 'Celular não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar celular:', error);
    res.status(500).json({ error: 'Erro ao atualizar celular' });
  }
};

const deletePhone = async (req, res) => {
  const { code } = req.params; 

  try {
    const phone = await Produto.findOne({ where: { code } });

    if (!phone) {
      return res.status(404).json({ message: 'Celular não encontrado' });
    }

    await DeletedPhone.create({
      model: phone.model,
      brand: phone.brand,
      price: phone.price,
      color: phone.color,
      code: phone.code,
    });

    await phone.destroy();

    res.json({ message: 'Celular excluído e registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir celular:', error); 
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const listDeletedPhones = async (req, res) => {
  try {
    const deletedPhones = await DeletedPhone.findAll();
    res.json(deletedPhones);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar celulares excluídos' });
  }
};

const getPhoneByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const phone = await Produto.findOne({ where: { code } });

    if (!phone) {
      return res.status(404).json({ message: 'Celular não encontrado' });
    }

    return res.status(200).json(phone);
  } catch (error) {
    console.error('Erro ao buscar celular pelo código:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { listPhone, createPhone, updatePhone, deletePhone, listDeletedPhones, getPhoneByCode };
