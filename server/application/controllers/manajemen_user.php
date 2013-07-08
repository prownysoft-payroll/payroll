<?php
	class Manajemen_User extends CI_Controller{

		function __construct()
		{
			parent::__construct();
			$this->output
				->set_content_type('application/json')
				->set_status_header('400');
			$this->Model_login->is_already_login("with message");
			$this->load->model('Model_menu');
		}

		public function index(){
			$result = $this->Model_menu->get_role_and_access();

			if ($result->num_rows() > 0)
			{
				$this->output->set_status_header('200');
				$result->row()->success=true;
				$this->output->set_output(json_encode($result->row()));
			}else
				die(json_encode(array("success" => false, "message" =>"user anda tidak terdaftar lagi, harap menghubungi owner untuk mendaftar dan mendapatkan akses", "short_message"=>"")));
		}

		public function lists(){
			$result = $this->Model_menu->get_access_manajemen_user();
			if($result->num_rows() > 0){
				$this->output->set_status_header('200');
				$arr = array("datas" => $result->row(), "success"=> true);
				$this->output->set_output(json_encode($arr));
			}else
				die(json_encode(array("success" => false, "message" => "anda tidak dapat hak akses ini", "short_message"=>"no access permited")));
		}
	}
?>