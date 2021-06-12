const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // Use Sequelize's `findAll()` method to show all the tags
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'product_data'}],
      //, through: ProductTag, as: 'tag_products'
    });
    res.status(200).json(tagData);

  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // Use Sequelize's `findByPk()` method to show the tag by id
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{ model: Product, through: ProductTag, as: 'product_data'}],
    })
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  //Use Sequelize's `CREATE()` method to CREATE a new tag 
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  //Use Sequelize's `update()` method to update the tag by id
  try{
    const tagData = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);

  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  //Use Sequelize's `destroy()` method to delete the tag by id
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
