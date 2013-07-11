<?php
	class Model_menu extends CI_Model
	{

		function __construct()
		{
			parent::__construct();
			$this->Model_login->is_already_login();
		}

		function get_role_and_access()
		{
			$sql = "select username,role, crud_golongan_kerja, crud_tunjangan
			from tbl_user where username=? and password=?";
			return $this->db->query($sql, array($this->session->userdata('username'), md5($this->session->userdata('password'))));
		}

		 function get_manajemen_user_access(){
		 	$sql = "select username from tbl_user where username=? and password=? and role like '%owner%'";
		 	$result = $this->db->query($sql, array($this->session->userdata('username'), md5($this->session->userdata('password')))); 
		 	if ($result->num_rows()!=1){
		 		$this->output
				->set_content_type('application/json')
				->set_status_header('400');
				die(json_encode(array("success" => false, "message" => "anda tidak dapat hak akses ini", "short_message"=>"no access permited")));
		 	}
		}

		function get_manajemen_user_data(){
			return $this->db->query("select id, username, role, crud_golongan_kerja, crud_tunjangan, crud_departemen, crud_jabatan, 
				crud_penambah_gaji, crud_pengurang_gaji, crud_PTKP, crud_status_karyawan, crud_mata_uang, crud_level_gaji, crud_bank, crud_jenis_pinjaman 
				from tbl_user");
		}
	}
?>