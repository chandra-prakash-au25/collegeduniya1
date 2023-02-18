const router = require("express").Router();
const project =require('../model/project')
const compaign =require('../model/compaign')

//all project
const project_all = async (req, res) => {
      try {
          const projects = await project.find();
          res.json(projects);
        } 
        catch (error) {
          res.json({ message: error });
        }
  };
  
  // Single project
  const project_details = async (req,res) => {
      try {
        console.log(req.query.project_id)
    
          const post = await project.findById(req.query.project_id);
          res.json(post);
        } catch (error) {
          res.json({ message: error });
        }
  };
  
  // Add New project
  const project_create = async (req, res) => {
      const userspost = new project({
        project_name:req.body.project_name,
        open_cost:req.body.open_cost,
        target_opens:req.body.target_opens,
        click_cost:req.body.click_cost,
        target_clicks:req.body.target_clicks,
        status:req.body.status   
        });
      
        try {
          const savedPost = await userspost.save();
          res.send(savedPost);
        } catch (error) {
          res.status(400).send(error);
        }
  };
  
  //upadte project
  const project_update = async (req, res) => {
    const projectUp=await project.findByIdAndUpdate(req.query.project_id, req.body) 
      try {
        const savedPost = await projectUp.save();
        res.send(savedPost);
      } catch (error) {
        res.status(400).send(error);
      }
};

  
  
  // Delete project
  const project_delete = async (req, res) => {
      try {
          const r_post = await project.findByIdAndDelete(req.query.project_id);
          res.json(r_post);
        } catch (error) {
          res.json({ message: error });
        }
  };


//get all compaign
  const compaign_all = async (req, res) => {
    try {
        const compaigns = await compaign.find();
        res.json(compaigns);
      } 
      catch (error) {
        res.json({ message: error });
      }
};

// Single compaign
const compaign_details = async (req,res) => {
    try {
      console.log(req.query.compaign_id)
        const post = await compaign.findById(req.query.compaign_id);
        res.json(post);
      } catch (error) {
        res.json({ message: error });
      }
};

// Add New compaign
const compaign_create = async (req, res) => {
    const userspost = new compaign({
        project_id:req.query.project_id,
        campaign_name:req.body.campaign_name,
        opens:req.body.opens,
        clicks:req.body.clicks,
        status:req.body.status
      });
    
      try {
        const savedPost = await userspost.save();
        res.send(savedPost);
      } catch (error) {
        res.status(400).send(error);
      }
};

//upadte compaign
const compaign_update = async (req, res) => {
  const compa_up=await compaign.findByIdAndUpdate(req.query.compaign_id, req.body) 
    try {
      const savedPost = await compa_up.save();
      res.send(savedPost);
    } catch (error) {
      res.status(400).send(error);
    }
};



// Delete compaign
const compaign_delete = async (req, res) => {
    try {
        const r_post = await compaign.findByIdAndDelete(req.query.compaign_id);
        res.json(r_post);
      } catch (error) {
        res.json({ message: error });
      }
};


//project stats


const project_stats = async (req, res) => {
    try {
        var result={}
        const projects = await project.paginate({},{page:req.query.page,limit:2});
        const projectdata=projects.docs
        var ids=[]
        for(let i=0;i<projectdata.length;i++){
            ids.push(projectdata[i]._id)
        }
        console.log(ids)
        const compa=await compaign.find({project_id: { $in: ids }})
        result['compaigns']=compa
        result['projects']=projects.docs

        res.json(result);
      } 
      catch (error) {
        res.json({ message: error });
      }
};


  module.exports = {
      project_all, 
      project_details, 
      project_create, 
      project_delete,
      project_update,
      compaign_all, 
      compaign_details, 
      compaign_create, 
      compaign_delete,
      compaign_update,
      project_stats

    }