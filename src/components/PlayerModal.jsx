import React, { useState, useEffect } from 'react';
import { getPlayerConfig } from '../utils/dataLoader';

function PlayerModal({ player, isOpen, onClose }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [yamlFiles] = useState([
    'agrawalom_737988_25383356_config_v13.yml',
    'aoorange_722540_25372279_config-2.yml',
    'chenyufei_662534_25342365_config.yml',
    'davidmatteo_749038_25383022_config.yml',
    'enchristopher_602285_25348856_config.yml',
    'fangyuan_LATE_736625_25402497_config.yml',
    'huangziyu_600639_25345415_config.yml',
    'linjiayi_742390_25311749_config.yml',
    'listeven_736587_25386131_config.yml',
    'litvakron_LATE_721981_25391228_Config.yml',
    'liuwenxuan_LATE_749142_25390122_config.yml',
    'lunamugicajose_722218_25384298_config_JML.yml',
    'mutolovincent_660111_25380863_config.yml',
    'niruichen_749387_25381152_config.yml',
    'pengjinjun_657484_25363213_config.yml',
    'schuettmaximilian_742091_25384969_config.yml',
    'shanzhihao_733390_25385717_config.yml',
    'singhsanjeevan_806110_25385314_config.yml',
    'srivastavaaayush_LATE_732701_25389500_config.yml',
    'sunclaire_733356_25370888_config.yml',
    'venkatanarayanannaveen_764261_25385794_config.yml',
    'wanganda_736635_25292697_config.yml',
    'wangarabella_736620_25345819_config.yml',
    'wangsherry_738330_25385663_config.yml',
    'wangyuan_736533_25383342_config.yml',
    'xiaoyue_736540_25350835_config.yml',
    'yangganxiang_737248_25349835_config-6.yml',
    'yenaimeng_LATE_605475_25475845_yenaimeng_LATE_605475_25474277_config.yml',
    'yujiehang_596718_25359060_config.yml',
    'zhangjingwen_412991_25379656_config.yml',
    'zhangkarina_666586_25359184_config.yml',
    'zhaoweiliang_668422_25383613_config.yml',
    'zhenggary_736563_25357709_config.yml',
    'zhouevan_663610_25377311_congfig.yml',
    'zhuruby_736383_25337304_config_1013.yml',
    'zhutianlei_732667_25376948_config.yml',
  ]);

  useEffect(() => {
    if (isOpen && player) {
      setLoading(true);
      getPlayerConfig(player.Player, yamlFiles)
        .then(setConfig)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, player, yamlFiles]);

  if (!isOpen || !player) return null;

  const agent0 = config?.agent0;
  const model = agent0?.model;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {player.Player}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Statistics */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Rank</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  #{player.Rank}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating (μ)</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {player.Rating_Mu.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  σ: {player.Rating_Sigma.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {(player.Win_Rate * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Record</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {player.Wins}-{player.Draws}-{player.Losses}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {player.Games} games
                </p>
              </div>
            </div>
          </section>

          {/* Model Information */}
          {loading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Loading configuration...
            </div>
          ) : config && model ? (
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Model Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <p>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Provider:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{model.provider}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Model:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{model.name}</span>
                </p>
                {model.params && (
                  <p>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Temperature:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{model.params.temperature}</span>
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Model Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-500 dark:text-gray-400">
                Configuration file not found for this player.
              </div>
            </section>
          )}

          {/* Prompts */}
          {config && agent0?.prompts && (
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Prompts
              </h3>
              <div className="space-y-4">
                {agent0.prompts.system_prompt && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      System Prompt
                    </h4>
                    <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {agent0.prompts.system_prompt}
                    </pre>
                  </div>
                )}
                {agent0.prompts.step_wise_prompt && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Step-wise Prompt
                    </h4>
                    <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {agent0.prompts.step_wise_prompt}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;

