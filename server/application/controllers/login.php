<?php 
	class Login extends CI_Controller{
		
		function __construct()
		{
			parent::__construct();
			$this->output
				->set_content_type('application/json')
				->set_status_header('400');
		}

		public function index()
		{

			if ($_SERVER['REQUEST_METHOD']=="GET")
			{
				if ($this->Model_login->is_already_login())
				{
					$array = array("success" => false, "message" =>"anda sudah login sebelumnya dengan nama <b>".$this->session->userdata('username')."</b>", "short_message"=>"already login");
					$this->output->set_output(json_encode($array));
					return FALSE;
				}

				$field = $this->input->get(NULL, true);
				$result = 0;
				if ($field["username"] && $field["password"])
					$result = $this->Model_login->login($field["username"], $field["password"]);
				
				if ($result)
				{
					$array = array("success" => true);
					$this->output->set_status_header('200');
				}else
					$array = array("success" => false, "message" =>"nama user atau password salah, coba isi kembali dengan benar", "short_message"=>"wrong login");
				
				$this->output->set_output(json_encode($array));
			}
		}

		public function logout()
		{
			$this->output->set_status_header('200');
			$this->session->sess_destroy();
		}
	}
?>