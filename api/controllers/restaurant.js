import Restaurant from "../models/Restaurant.js";
export const createRestaurant = async (req,res,next)=>{
    const newRestaurant = new Restaurant(req.body);
    try {
        const savedRestaurant = await newRestaurant.save();
        res.status(200).json(savedRestaurant);
    } catch (err) {
      next(err);
   }

}

export const updateRestaurant = async(req,res,next)=>{
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
    res.status(200).json(updatedRestaurant);
} catch (err) {
  next(err);
}

};

export const deleteRestaurant = async(req,res,next)=>{
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Restaurant has been deleted");
  } catch (err) {
    next(err);
}
};

export const getRestaurant = async (req,res,next)=>{
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }

};

export const getRestaurants = async(req,res,next)=>{
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
} catch (err) {
  next(err);
}
};

export const countByCity = async(req,res,next)=>{
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city=>{
      return Restaurant.countDocuments({ city:city })
    }))
    res.status(200).json(list);
} catch (err) {
  next(err);
}

};

export const countByType = async(req,res,next)=>{
  try {
    const restaurantCount = await Restaurant.countDocuments({type:"Restaurant"})
    const cofetarieCount = await Restaurant.countDocuments({type:"Cofetarie"});
    const coffeeCount = await Restaurant.countDocuments({type:"Cafenea"});
    const brunchCount = await Restaurant.countDocuments({type:"Brunch"});
  //  const cabinCount = await Restaurant.countDocuments({type:"cabin"});
    res.status(200).json([
      { type:"Restaurant", count:restaurantCount },
      { type:"Cofetarie", count:cofetarieCount },
      { type:"Cafenea", count:coffeeCount },
      { type:"Brunch", count:brunchCount },
    ]);
} catch (err) {
  next(err);
}

};